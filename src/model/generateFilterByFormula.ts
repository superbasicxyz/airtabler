import { AirtableListRequestParams } from "../../types.d";

export function generateFilterByFormula(
  params: Record<string, string | string[]>
): AirtableListRequestParams {
  let formula: string = "";

  if (typeof params.id == "string") {
    formula += `SEARCH(RECORD_ID(), "${params.id}")`;
  }

  if (Array.isArray(params.id)) {
    formula += `SEARCH(RECORD_ID(), "${params.id.join(",")}")`;
  }

  const fields = Object.keys(params);

  fields.forEach(field => {
    if (field == "id") {
      return;
    }
    formula += `SEARCH("${params[field]}", {${field}})`;
  });

  return { filterByFormula: formula };
}

import { generateFilterByFormula } from "./generateFilterByFormula";
import { getRecords } from "./getRecords";

import { AirtablerConfig } from "../../types.d";

export function where(tableUrl: URL, config: AirtablerConfig): Function {
  return async (params: Record<string, string | string[]>): Promise<any> => {
    try {
      const airtableRequestParams = generateFilterByFormula(params);
      const records = await getRecords(tableUrl, config, airtableRequestParams);
      return records;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

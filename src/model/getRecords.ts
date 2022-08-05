import { airtablerRequest } from "../airtablerRequest";

import {
  AirtablerConfig,
  AirtableRecord,
  AirtableListRequestParams
} from "../../types.d";

export async function getRecords(
  url: URL,
  config: AirtablerConfig,
  params?: AirtableListRequestParams
): Promise<AirtableRecord[]> {
  const collection: AirtableRecord[] = [];

  const requestUrl = new URL(url);

  if (params?.offset) {
    requestUrl.searchParams.append("offset", params.offset);
  }

  if (params?.filterByFormula) {
    requestUrl.searchParams.append("filterByFormula", params.filterByFormula);
  }

  requestUrl.searchParams.append("maxRecords", "1000");

  console.log(requestUrl);

  const response = await airtablerRequest(requestUrl.href, config);

  const {
    data: { records, offset }
  } = response;

  records.map((record: AirtableRecord) => collection.push(record));

  if (offset) {
    const nextRecords = await getRecords(url, config, { offset });
    nextRecords.map(record => collection.push(record));
  }

  return collection;
}

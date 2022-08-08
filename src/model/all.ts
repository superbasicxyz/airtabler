import { getRecords } from "./getRecords";

import { AirtablerConfig, AirtableError, AirtableRecord } from "../../types.d";

export function all(tableUrl: URL, config: AirtablerConfig): Function {
  return async (): Promise<AirtableRecord[] | AirtableError> => {
    try {
      const records = await getRecords(tableUrl, config);
      return records;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

import { airtablerRequest } from "../airtablerRequest";

import { AirtablerConfig, AirtableError, AirtableRecord } from "../../types.d";

export function update(tableUrl: URL, config: AirtablerConfig): Function {
  return async (
    params: AirtableRecord | AirtableRecord[]
  ): Promise<AirtableRecord[] | AirtableError> => {
    try {
      const recordsToUpdate = Array.isArray(params) ? params : [params];

      const response = await airtablerRequest(`${tableUrl}`, config, {
        method: "patch",
        data: { records: recordsToUpdate }
      });

      const { data: records } = response;
      return records;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

import { airtablerRequest } from "../airtablerRequest";

import {
  AirtablerConfig,
  AirtableError,
  AirtableRecordFields,
  AirtableRecord
} from "../../types.d";

export function create(tableUrl: URL, config: AirtablerConfig): Function {
  return async (
    params: AirtableRecordFields | AirtableRecordFields[]
  ): Promise<AirtableRecord[] | AirtableError> => {
    try {
      const recordsToCreate = Array.isArray(params)
        ? params.map(p => {
            return {
              fields: p
            };
          })
        : [{ fields: params }];

      const response = await airtablerRequest(`${tableUrl}`, config, {
        method: "post",
        data: { records: recordsToCreate }
      });

      const { data: records } = response;
      return records;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

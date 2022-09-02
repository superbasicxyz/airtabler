import { airtablerRequest } from "../airtablerRequest";

import { AirtablerConfig, AirtableError, AirtableRecord } from "../../types.d";

export function destroy(tableUrl: URL, config: AirtablerConfig): Function {
  return async (
    recordIds: string | string[]
  ): Promise<AirtableRecord | AirtableError> => {
    try {
      if (Array.isArray(recordIds)) {
        recordIds.map(recordId => {
          tableUrl.searchParams.append("records[]", recordId);
        });
      } else {
        tableUrl.searchParams.append("records[]", recordIds);
      }

      const response = await airtablerRequest(`${tableUrl}`, config, {
        method: "delete"
      });

      const { data: records } = response;
      return records;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

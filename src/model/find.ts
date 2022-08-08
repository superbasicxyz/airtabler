import { airtablerRequest } from "../airtablerRequest";

import { AirtablerConfig, AirtableError, AirtableRecord } from "../../types.d";

export function find(tableUrl: URL, config: AirtablerConfig): Function {
  return async (recordId: string): Promise<AirtableRecord | AirtableError> => {
    try {
      const response = await airtablerRequest(
        `${tableUrl}/${recordId}`,
        config
      );
      const { data: record } = response;
      return record;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

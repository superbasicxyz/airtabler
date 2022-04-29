import { baseUrl } from "./baseUrl";
import { airtablerRequest } from "./airtablerRequest";

import {
  AirtablerConfig,
  AirtableError,
  AirtableRecord,
  Model
} from "./types.d";

function all(tableUrl: string, config: AirtablerConfig): Function {
  return async (): Promise<AirtableRecord[] | AirtableError> => {
    try {
      const response = await airtablerRequest(tableUrl, config);
      const {
        data: { records }
      } = response;
      return records;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

function find(tableUrl: string, config: AirtablerConfig): Function {
  return async (recordId: string): Promise<AirtableRecord | AirtableError> => {
    try {
      const response = await airtablerRequest(`${tableUrl}/${recordId}`, config);
      const { data: record } = response;
      return record;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

export function model(config: AirtablerConfig): Function {
  return (tableName: string): Model => {
    const tableUrl = `${baseUrl(config.baseId)}/${tableName}`;

    return {
      tableName: () => tableName,
      tableUrl: () => tableUrl,
      all: all(tableUrl, config),
      find: find(tableUrl, config)
    };
  };
}

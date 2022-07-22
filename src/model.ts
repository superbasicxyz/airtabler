import { baseUrl } from "./baseUrl";
import { airtablerRequest } from "./airtablerRequest";

import {
  AirtablerConfig,
  AirtableError,
  AirtableRecord,
  Model
} from "./types.d";

function all(tableUrl: string, config: AirtablerConfig): Function {
  async function getRecords(url: string, config: AirtablerConfig, offsetParam?: string): Promise<AirtableRecord[]> {
    const collection: AirtableRecord[] = [];

    const requestUrl = offsetParam ? `${url}?offset=${offsetParam}` : url;

    const response = await airtablerRequest(requestUrl, config);

    const {
      data: { records, offset }
    } = response;

    records.map((record: AirtableRecord) => collection.push(record));

    if (offset) {
      const nextRecords = await getRecords(`${url}`, config, offset);
      nextRecords.map(record => collection.push(record));
    }

    return collection;
  }

  return async (): Promise<AirtableRecord[] | AirtableError> => {
    try {
      const records = await getRecords(tableUrl, config);
      return records;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

function find(tableUrl: string, config: AirtablerConfig): Function {
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

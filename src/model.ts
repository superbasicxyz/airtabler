import { baseUrl } from "./baseUrl";
import { airtablerRequest } from "./airtablerRequest";

import {
  AirtablerConfig,
  AirtableError,
  AirtableRecord,
  Model
} from "./types.d";

function all(tableUrl: URL, config: AirtablerConfig): Function {
  async function getRecords(url: URL, config: AirtablerConfig, offsetParam?: string): Promise<AirtableRecord[]> {
    const collection: AirtableRecord[] = [];

    const requestUrl = new URL(url);

    if (offsetParam) {
      requestUrl.searchParams.append("offset", offsetParam);
    }

    requestUrl.searchParams.append("maxRecords", "1000");

    const response = await airtablerRequest(requestUrl.href, config);

    const {
      data: { records, offset }
    } = response;

    records.map((record: AirtableRecord) => collection.push(record));

    if (offset) {
      const nextRecords = await getRecords(url, config, offset);
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

function find(tableUrl: URL, config: AirtablerConfig): Function {
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
    const tableUrl = new URL(`${baseUrl(config.baseId)}/${tableName}`);

    return {
      tableName: () => tableName,
      tableUrl: () => tableUrl,
      all: all(tableUrl, config),
      find: find(tableUrl, config)
    };
  };
}

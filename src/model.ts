import { baseUrl } from "./baseUrl";
import { airtablerRequest } from "./airtablerRequest";

import {
  AirtablerConfig,
  AirtableError,
  AirtableRecord,
  AirtableListRequestParams,
  Model
} from "../types.d";

async function getRecords(
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

function all(tableUrl: URL, config: AirtablerConfig): Function {
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

function generateFilterByFormula(params: Record<string, string | string[]>): AirtableListRequestParams {
  let formula: string = "";

  if (typeof params.id == "string") {
    formula += `SEARCH(RECORD_ID(), "${params.id}")`;
  }

  if (Array.isArray(params.id)) {
    formula += `SEARCH(RECORD_ID(), "${params.id.join(",")}")`;
  }

  return { filterByFormula: formula };
}

function where(tableUrl: URL, config: AirtablerConfig): Function {
  return async (params: Record<string, string | string[]>): Promise<any> => {
    try {
      console.log(params);
      const airtableRequestParams = generateFilterByFormula(params);
      const records = await getRecords(tableUrl, config, airtableRequestParams);
      return records;
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
      find: find(tableUrl, config),
      where: where(tableUrl, config)
    };
  };
}

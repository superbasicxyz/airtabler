import axios from "axios";

type AirtableRecordFields = {
  [key: string]: string | string[];
};

type AirtableErrorError = {
  type: string;
  message: string;
}

type AirtableError = {
  error: string | AirtableErrorError;
};

type AirtableRecord = {
  id: string;
  createdTime: string;
  fields: AirtableRecordFields;
}

function all(tableUrl: string): Function {
  return async (): Promise<AirtableRecord[] | AirtableError> => {
    try {
      const response = await axios.get(`${tableUrl}`);
      const {
        data: { records }
      } = response;
      return records;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

function find(tableUrl: string): Function {
  return async (recordId: string): Promise<AirtableRecord | AirtableError> => {
    try {
      const response = await axios.get(`${tableUrl}/${recordId}`);
      const { data: record } = response;
      return record;
    } catch (error: any) {
      return error.response.data;
    }
  };
}

interface Model {
  tableName: Function;
  tableUrl: Function;
  all: Function;
  find: Function;
}

export function model(baseUrl: string): Function {
  return (tableName: string): Model => {
    const tableUrl = `${baseUrl}/${tableName}`;

    return {
      tableName: () => tableName,
      tableUrl: () => tableUrl,
      all: all(tableUrl),
      find: find(tableUrl)
    };
  };
}

import axios from "axios";

type AirtableRecordFields = {
  [key: string]: string | string[];
};

interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: AirtableRecordFields;
}

function all(tableUrl: string): Function {
  console.log(tableUrl);

  return async (): Promise<AirtableRecord[]> => {
    const response = await axios.get(`${tableUrl}`);
    const {
      data: { records }
    } = response;
    return records;
  };
}

function find(tableUrl: string): Function {
  console.log(tableUrl);
  return (recordId: string) => {
    return { id: recordId };
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

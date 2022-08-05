export interface AirtablerConfig {
  baseId: string;
  apiKey: string;
}

export type AirtableRecordFields = {
  [key: string]: string | string[];
};

export type AirtableErrorError = {
  type: string;
  message: string;
};

export type AirtableError = {
  error: string | AirtableErrorError;
};

export type AirtableRecord = {
  id: string;
  createdTime: string;
  fields: AirtableRecordFields;
};

export interface Model {
  tableName: Function;
  tableUrl: Function;
  all: Function;
  find: Function;
}

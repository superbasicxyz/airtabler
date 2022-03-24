function all(tableUrl: string): Function {
  console.log(tableUrl);
  return (): Array<string> => {
    return [];
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
};

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

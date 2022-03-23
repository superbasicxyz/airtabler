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

export function model(baseUrl: string) {
  return (tableName: string) => {
    const tableUrl = `${baseUrl}/${tableName}`;

    return {
      tableName: () => tableName,
      tableUrl: () => tableUrl,
      all: all(tableUrl),
      find: find(tableUrl)
    };
  };
}

function genBaseUrl(baseId: string) {
  return () => `https://api.airtable.com/v0/${baseId}`;
}

function genModel(baseUrl: string) {
  function all(baseName: string) {
    console.log(baseUrl);
    console.log(baseName);
    return () => { return [] };
  }

  return (baseName: string) => {
    return {
      baseName: () => baseName,
      all: all(baseName)
    }
  };
}

const airtabler = {
  init: (baseId: string) => {
    const baseUrl: Function = genBaseUrl(baseId);
    const model: Function = genModel(baseUrl());
    return {
      baseUrl,
      model
    };
  }
};

export default airtabler;

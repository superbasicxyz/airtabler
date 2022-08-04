import { model } from "./model";

import { AirtablerConfig } from "./types.d";

const airtabler = {
  init: (config: AirtablerConfig) => {
    return {
      model: model(config)
    };
  }
};

export { airtabler };

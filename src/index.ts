import { model } from "./model";
import { schema } from "./schema";

import { AirtablerConfig } from "../types.d";

const airtabler = {
  init: (config: AirtablerConfig) => {
    return {
      model: model(config),
      schema: schema(config),
    };
  }
};

export { airtabler };

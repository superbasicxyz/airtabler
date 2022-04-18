import { baseUrl } from './baseUrl';
import { model } from './model';

import { AirtablerConfig } from './index.d';

const airtabler = {
  init: ({ baseId }: AirtablerConfig) => {
    return {
      baseUrl: () => baseUrl(baseId),
      model: model(baseUrl(baseId))
    };
  }
};

export default airtabler;

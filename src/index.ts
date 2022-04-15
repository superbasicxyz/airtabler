import { baseUrl } from './baseUrl';
import { model } from './model';

interface AirtablerConfig {
  baseId: string;
  apiKey: string;
}

const airtabler = {
  init: ({ baseId }: AirtablerConfig) => {
    return {
      baseUrl: () => baseUrl(baseId),
      model: model(baseUrl(baseId))
    };
  }
};

export default airtabler;

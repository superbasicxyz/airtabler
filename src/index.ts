import { baseUrl } from './baseUrl';
import { model } from './model';

const airtabler = {
  init: (baseId: string) => {
    return {
      baseUrl: () => baseUrl(baseId),
      model: model(baseUrl(baseId))
    };
  }
};

export default airtabler;

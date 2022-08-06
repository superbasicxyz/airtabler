import { baseUrl } from "../baseUrl";
import { all } from "./all";
import { find } from "./find";
import { where } from "./where";

import { AirtablerConfig, Model } from "../../types.d";

export function model(config: AirtablerConfig): Function {
  return (tableName: string): Model => {
    const tableUrl = new URL(`${baseUrl(config.baseId)}/${tableName}`);

    return {
      tableName: () => tableName,
      tableUrl: () => tableUrl,
      all: all(tableUrl, config),
      find: find(tableUrl, config),
      where: where(tableUrl, config)
    };
  };
}
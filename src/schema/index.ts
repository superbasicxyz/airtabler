import { AirtablerConfig } from "../../types";
import { list } from "./list";

export function schema(config: AirtablerConfig): Function {
    return () => {
        return {
            list: list(config)
        }
    }
}
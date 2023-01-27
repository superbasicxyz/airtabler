import { AirtablerConfig } from "../../types";
import { airtablerRequest } from "../airtablerRequest";

export function list(config: AirtablerConfig) { 
    return async () => {
        try {
            const response = await airtablerRequest("https://api.airtable.com/v0/meta/bases", config);
            return response.data.bases;
        } catch (error: any) {
           console.log(error); 
        }
    }
}

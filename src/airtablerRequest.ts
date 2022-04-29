import axios, { AxiosResponse } from "axios";
import { AirtablerConfig } from "./types.d";

export function airtablerRequest(url: string, { apiKey }: AirtablerConfig): Promise<AxiosResponse> {
  return axios.get(url, {
    headers: {
      Authorization: apiKey
    }
  });
}

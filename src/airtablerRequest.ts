import axios, { AxiosResponse, Method } from "axios";
import { AirtablerConfig } from "../types.d";

interface AirtablerRequestOptions {
  method: Method
}

const defaultOptions: AirtablerRequestOptions = {
  method: "get"
}

export function airtablerRequest(
  url: string,
  { apiKey }: AirtablerConfig,
  { method }: AirtablerRequestOptions = defaultOptions
): Promise<AxiosResponse> {
  return axios({
    method,
    url,
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
}

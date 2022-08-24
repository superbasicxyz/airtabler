import axios, { AxiosResponse, Method, AxiosRequestConfig } from "axios";
import { AirtablerConfig } from "../types.d";

interface AirtablerRequestOptions {
  method: Method,
  data?: any
}

const defaultOptions: AirtablerRequestOptions = {
  method: "get"
}

export function airtablerRequest(
  url: string,
  { apiKey }: AirtablerConfig,
  options?: AirtablerRequestOptions
): Promise<AxiosResponse> {
  const method = options ? options.method : defaultOptions.method;
  const data = options?.data ? options.data : null;

  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  if ((method == "post" || method == "patch") && data) {
    requestConfig.headers!["Content-Type"] = "application/json";
    requestConfig.data = data;
  }

  return axios(requestConfig);
}

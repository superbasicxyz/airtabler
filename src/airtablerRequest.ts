import axios, { AxiosResponse, Method, AxiosRequestConfig } from "axios";
import { AirtablerConfig } from "../types.d";

interface AirtablerRequestOptions {
  method: Method;
  data?: any;
}

const defaultOptions: AirtablerRequestOptions = {
  method: "get"
};

export function airtablerRequest(
  url: string,
  { apiKey }: AirtablerConfig,
  { method, data }: AirtablerRequestOptions = defaultOptions
): Promise<AxiosResponse> {
  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  switch (method) {
    case "get":
      return airtablerGetRequest(requestConfig);
      break;
    case "post":
      return airtablerPostRequest(requestConfig, data);
      break;
    case "patch":
      return airtablerPatchRequest(requestConfig, data);
      break;
    case "delete":
      return airtablerDeleteRequest(requestConfig);
      break;
    default:
      console.error(`unsupported request method: ${method}`);
      break;
  }

  return axios(requestConfig);
}

function airtablerGetRequest(
  requestConfig: AxiosRequestConfig
): Promise<AxiosResponse> {
  return axios(requestConfig);
}

function airtablerPostRequest(
  requestConfig: AxiosRequestConfig,
  data: any
): Promise<AxiosResponse> {
  return axios({
    ...requestConfig,
    headers: { ...requestConfig.headers, "Content-Type": "application/json" },
    data
  });
}

// the functions below take the same arguments and handle the request the same way
// we'll put them in as aliases for now. if we need to break them out with their own
// logic we can easily do so later

const airtablerPatchRequest = airtablerPostRequest;

const airtablerDeleteRequest = airtablerGetRequest;

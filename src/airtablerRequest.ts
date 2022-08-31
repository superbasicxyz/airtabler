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

function airtablerPatchRequest(
  requestConfig: AxiosRequestConfig,
  data: any
): Promise<AxiosResponse> {
  return axios({
    ...requestConfig,
    headers: { ...requestConfig.headers, "Content-Type": "application/json" },
    data
  });
}

function airtablerDeleteRequest(
  requestConfig: AxiosRequestConfig
): Promise<AxiosResponse> {
  return axios(requestConfig);
}

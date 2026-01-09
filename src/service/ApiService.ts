import Axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

import { axiosUrl } from "./axiosUrl";
import { openUrl } from "./openUrl";

const API_URL = import.meta.env.REACT_APP_API_URL || "";
// const API_VERSION = "0.1"; // TODO (versioning)
const TIMEOUT = 120000;

const responseHandler = (response: AxiosResponse) => {
 return response;
};

const errorHandler = (error: AxiosError): void => {
 if (error?.response?.status !== 200) {
  if (error?.response?.status === 401 || error?.response?.status === 403) {
   localStorage.clear();
   window.location.href = "/login";
   return;
  }

  throw new Error(`${error?.response?.statusText}: ${error?.response?.data}`);
 }
};

const urlSelector = (url: string): string => {
 const filteredData = axiosUrl.filter(
  (axiosData) => axiosData.urls.filter((urlCall) => url.includes(urlCall)).length >= 1
 );
 if (filteredData.length === 1) return filteredData[0].apiUrl;
 if (filteredData.length > 1) {
  const splittedString = url.includes("?") ? url.split("?") : url;
  let resultedString = "";
  for (let element of filteredData) {
   if (url.includes("?")) {
    if (element.urls.find((urlCall) => splittedString[0] === urlCall))
     resultedString = element.apiUrl;
   } else {
    if (element.urls.find((urlCall) => splittedString === urlCall)) resultedString = element.apiUrl;
   }
  }

  return resultedString;
 } else return API_URL;
};

const API = Axios.create({
 baseURL: API_URL,
 timeout: TIMEOUT,
 headers: { accept: "application/json" }
});

API.interceptors.request.use((config) => {
 const token = localStorage.getItem("jwt");
 config.headers["x-auth-token"] = token;
 config.headers["content-type"] = "application/json";
 config.baseURL = urlSelector(config.url || "");

 return config;
});

API.interceptors.response.use(
 // @ts-ignore
 (response) => responseHandler(response),
 (error) => errorHandler(error)
);

export const ApiService = async <T = any, D = Record<string, unknown>>(
 url: string,
 method: string = "GET",
 params?: D,
 config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
 const token = localStorage.getItem("jwt");
 if (!token && !openUrl.includes(url)) {
  localStorage.clear();
  window.location.href = "/login";
  return {
   data: {},
   status: 403
  } as AxiosResponse;
 }

 switch (method) {
  case "GET":
   return API.get(url, config);
  case "POST":
   return API.post(url, params, config);
  case "PUT":
   return API.put(url, params, config);
  case "DELETE":
   return API.delete(url, config);
  case "PATCH":
   return API.patch(url, params, config);
  default:
   return API.get(url, config);
 }
};

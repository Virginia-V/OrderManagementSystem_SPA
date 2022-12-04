import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ApiResponse } from "../entities/apiResponse";
import LocalStorageService from "./LocalStorageService";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

async function get<Result>(path: string): Promise<Result> {
  return execute(() => axios.get(path));
}

async function post<Result>(path: string, body?: any): Promise<Result> {
  return execute(() => axios.post(path, body));
}

async function patch<Result>(path: string, body?: any): Promise<Result> {
  return execute(() => axios.patch(path, body));
}

async function _delete<Result>(path: string): Promise<Result> {
  return execute(() => axios.delete(path));
}

function setToken() {
  const tokenObjectString = LocalStorageService.getItem(
    "@@auth0spajs@@::KjULl4vcQj3VPWjVV8hZXB2CUQfW5ybl::http://localhost:5253/api::openid profile email"
  );
  if (!tokenObjectString) return;
  const authObj = JSON.parse(tokenObjectString).body;
  axios.defaults.headers[
    "Authorization"
  ] = `${authObj.token_type} ${authObj.access_token}`;
}

function setLanguage(language: string) {
  axios.defaults.headers["Accept-Language"] = language;
}

async function execute<TResult>(request: () => Promise<AxiosResponse<any>>) {
  try {
    const { data } = await request();
    const apiResponse = data as ApiResponse<TResult>;
    if (apiResponse.succeeded) return Promise.resolve(apiResponse.result);
    toast.error(apiResponse.errorMessage);
    return Promise.reject({ apiRequestFailed: true });
  } catch (error) {
    return Promise.reject(error);
  }
}

const httpMethods = {
  get,
  post,
  _delete,
  setLanguage,
  patch,
  setToken,
};

export default httpMethods;

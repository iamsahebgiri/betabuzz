import axios from "axios";
import dayjs from "@/lib/dayjs";
import Cookies from "js-cookie";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const unAuthorizedStatus = [401];
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status }: any = error.response;
    if (unAuthorizedStatus.includes(status)) {
      Cookies.remove("refreshToken", { path: "/" });
      Cookies.remove("accessToken", { path: "/" });
      console.log("window.location.href", window.location.pathname);
      if (window.location.pathname != "/login") window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

abstract class APIService {
  protected baseURL: string;
  protected headers: any = {};

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  }

  setRefreshToken(token: string, expires: string) {
    Cookies.set("refreshToken", token, {
      expires: dayjs(expires).toDate(),
    });
  }

  getRefreshToken() {
    return Cookies.get("refreshToken");
  }

  purgeRefreshToken() {
    Cookies.remove("refreshToken", { path: "/" });
  }

  setAccessToken(token: string, expires: string) {
    Cookies.set("accessToken", token, {
      expires: dayjs(expires).toDate(),
    });
  }

  getAccessToken() {
    return Cookies.get("accessToken");
  }

  purgeAccessToken() {
    Cookies.remove("accessToken", { path: "/" });
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
    };
  }

  getWithoutBase(url: string, config = {}): Promise<any> {
    return axios({
      method: "get",
      url: url,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  get(url: string, config = {}): Promise<any> {
    return axios({
      method: "get",
      url: this.baseURL + url,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  post(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "post",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  put(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "put",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  patch(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "patch",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  delete(url: string, data?: any, config = {}): Promise<any> {
    return axios({
      method: "delete",
      url: this.baseURL + url,
      data: data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  mediaUpload(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "post",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken()
        ? { ...this.getHeaders(), "Content-Type": "multipart/form-data" }
        : {},
      ...config,
    });
  }

  request(config = {}) {
    return axios(config);
  }
}

export default APIService;

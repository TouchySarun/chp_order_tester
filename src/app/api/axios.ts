import axios from "axios";

const DEFAULT_PATH = "http://localhost:3000/api/";

let token: string | null = null;

export const setAccessToken = (accessToken: string) => {
  token = accessToken;
};

const axiosInstance = axios.create({
  baseURL: DEFAULT_PATH,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

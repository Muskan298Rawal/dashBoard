import axios from "axios";
const apiSerive = () => {
  let instance = axios.create();

  instance.defaults.baseURL = "https://sigviewauth.sigmoid.io/api/v1";
  instance.interceptors.request.use(function (config) {
    const token =
      localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    instance.defaults.headers.common["x-auth-token"] = token;
    config.headers.common["x-auth-token"] = token;
    return config;
  });

  return instance;
};
export default apiSerive();

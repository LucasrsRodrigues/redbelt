import axios from "axios";

let api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});


api.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const response = await api.post('/refresh', {});
      const access_token = response?.data?.access_token;

      api.defaults.headers[
        'Authorization'
      ] = `Bearer ${access_token}`;

      return api(originalRequest);

    } catch (error) {
      console.error('Token refresh failed:', error);
      return Promise.reject(error);
    }

  }


  return Promise.reject(error);
})

export default api;
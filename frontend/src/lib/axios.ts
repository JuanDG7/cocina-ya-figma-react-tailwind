import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

//con lo de arriba puedo manejar la parte de catch(error) en los try-catch, si es que no quiero formatear primeramente la respuesta antes que
//llegue al errorBoundery, osea el errorElement....

export default api;

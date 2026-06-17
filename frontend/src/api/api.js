import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    console.log(
      "AUTH HEADER:",
      config.headers.Authorization
    );

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

export default API;
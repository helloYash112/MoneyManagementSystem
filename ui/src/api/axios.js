import axios from "axios";

const url = "https://cautious-giggle-5gvq9v4xxq4jf4xjr-8080.app.github.dev/api";


export const api = axios.create({
  baseURL: url,
  withCredentials: true,
});
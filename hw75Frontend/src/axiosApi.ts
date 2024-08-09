import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'http://localhost:8800/',
})

export default axiosApi;
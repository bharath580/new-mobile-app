
import axios from "axios";

export const api = axios.create({
    // baseURL: 'http://13.202.98.144:2000/api/',
    baseURL: 'http://192.168.1.2:2000/api/',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar',}
  });
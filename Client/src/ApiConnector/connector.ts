import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";


axios.defaults.baseURL = "http://localhost:5000/api/";

function responseBody(response: AxiosResponse){
  return response.data;
}

axios.interceptors.response.use( async response => {
    return response;
    }, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    
    if (status === 400) {
        toast.error(data.title);
    }
    if (status === 401) {
        toast.error(data.title);
    }
    if (status === 404) {
        toast.error(data.title);
    }
    if (status === 500) {
        toast.error(data.title);
    }
    return Promise.reject(error.response);
    }
    
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Products = {
  list: () => requests.get("Products"),
  details: (id: string) => requests.get(`Products/${id}`),
};

const TestErrors = {
    get400Error: () => requests.get("errors/bad-request"),
    get401Error: () => requests.get("errors/unauthorized"),
    get404Error: () => requests.get("errors/not-found"),
    get500Error: () => requests.get("errors/server-error"),
    getValidationError: () => requests.get("errors/validation-error"),
    };

const apiConnector = {
    Products,
    TestErrors,
};

export default apiConnector;

/*
AxiosError {message: 'Request failed with status code 404', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest, …}
code
: 
"ERR_BAD_REQUEST"
config
: 
{transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
message
: 
"Request failed with status code 404"
name
: 
"AxiosError"
request
: 
XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
response
: 
{data: {…}, status: 404, statusText: 'Not Found', headers: AxiosHeaders, config: {…}, …}
stack
: 
"AxiosError: Request failed with status code 404\n    at settle (http://localhost:3000/node_modules/.vite/deps/axios.js?v=5c747f84:1216:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/node_modules/.vite/deps/axios.js?v=5c747f84:1562:7)\n    at Axios.request (http://localhost:3000/node_modules/.vite/deps/axios.js?v=5c747f84:2078:41)\n    at async fetchProduct (http://localhost:3000/src/Pages/ProductDetails.tsx?t=1717193893925:27:34)"
[[Prototype]]
: 
Error
*/
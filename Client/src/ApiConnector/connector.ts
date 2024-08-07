/* eslint-disable @typescript-eslint/no-explicit-any */

import globalRouter from "@/globalRouter";
import axios, { AxiosError, AxiosResponse } from "axios";


import { toast } from "react-toastify";



axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true; 

function responseBody(response: AxiosResponse){
  return response.data;
}

axios.interceptors.request.use(config => {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    const token = user ? user.token : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }, error => {
    return Promise.reject(error);
    }


);
// Tis interceptor is used to modify the put request of the admin/orders endpoint to include the status in the query params. Because the API expects the status to be in the query params and not in the body.
axios.interceptors.request.use(config => {
    if (config.url?.startsWith('Orders/admin/orders/') && config.method === 'put') {
      config.params = { ...config.params, status: config.data.status };
      delete config.data.status;
    }
    return config;
  });

axios.interceptors.response.use( async response => {
    return response;
    }, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    
    if (status === 400) {
        
        if(data.errors) {
            const modalStateErrors = [];
            for (const key in data.errors) {
                if (data.errors[key]&& !key.includes("UserName")) {
                    const errorMessage = data.errors[key];
                
                    modalStateErrors.push(errorMessage);
                
                }
            }
            toast.error( modalStateErrors.join("\n"));
        }
        else {
            toast.error(data.title);
        }
    }
    if (status === 401) {
        toast.error(data || "Unauthorized! Please login to continue");
        localStorage.removeItem("user");
        if(globalRouter.navigate) {
            globalRouter.navigate("/login");
        }

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
  getWithParams: (url: string, params: any) => axios.get(url, params).then(responseBody),
};

const Products = {
  list: () => requests.get("Products"),
  details: (id: string) => requests.get(`Products/${id}`),
  create: (product: any) => requests.post("Products", product),
  update: (product: any) => requests.put(`Products/${product.id}`, product),
  delete: (id: string) => requests.del(`Products/${id}`),
};

const TestErrors = {
    get400Error: () => requests.get("errors/bad-request"),
    get401Error: () => requests.get("errors/unauthorized"),
    get404Error: () => requests.get("errors/not-found"),
    get500Error: () => requests.get("errors/server-error"),
    getValidationError: () => requests.get("errors/validation-error"),
    };

const Basket = {
    get: () => requests.get("Basket"),
    add: (productId: string, qantity=1) => requests.post(`Basket?productId=${productId}&quantity=${qantity}`, {}),
    remove: (productId: string , qantity=1) => requests.del(`Basket?productId=${productId}&quantity=${qantity}`),
    };

const Account = {
    login: (values: any) => requests.post(`account/login`, values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddresses: () => requests.get('account/savedAddress'),
    saveAddress: (address: any) => requests.post('account/saveAddress', address),
    };

const Orders = {
    list: () => requests.get("Orders"),
    details: (id: string) => requests.get(`Orders/${id}`),
    create: (order: any) => requests.post("Orders", order),
    listForAdmin: (params: any) => requests.getWithParams('Orders/admin/orders', { params }),
    detailsForAdmin: (id: string) => requests.get(`Orders/admin/orders/${id}`),
    updateStatus: (id: string, status: number) => requests.put(`Orders/admin/orders/${id}`, { status })
    };
    const Analytics = {
        get: () => requests.get("Analytics"),
      };


const apiConnector = {
    Products,
    TestErrors,
    Basket,
    Account,
    Orders,
    Analytics,
};

export default apiConnector;


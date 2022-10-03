import axios, {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
} from 'axios';
import Qs from 'qs';
import { objectType } from 'type';

const onSuccessInterceptorRequest = async (config: AxiosRequestConfig) => {
  const newConfig = { ...config };
  // NOTE: remove locale from headers (fixed CORS issue)
  delete newConfig.headers.locale;
  newConfig.paramsSerializer = (params: any) =>
    Qs.stringify(params, {
      arrayFormat: 'brackets',
    });
  return newConfig;
};
const onErrorInterceptorRequest = (error: AxiosError) => Promise.reject(error);

const onErrorInterceptorResponse = (error: AxiosError) => {
  if (error.response && error.response.status)
    console.error(
      `${error.response.config.method.toUpperCase()}: ${
        error.response.status
      }: ${error.response.config.url}`,
    );
  return Promise.reject(error);
};
const onSuccessInterceptorResponse = (response: AxiosResponse) => {
  if (response.status === 200)
    console.debug(
      `${response.config.method.toUpperCase()}: ${response.status}: ${
        response.config.url
      }`,
    );
  return response;
};

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post.Accept = 'application/json';

const _axios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 120 * 1000,
  // withCredentials: true, // Check cross-site Access-Control
});

_axios.interceptors.request.use(
  onSuccessInterceptorRequest,
  onErrorInterceptorRequest,
);

_axios.interceptors.response.use(
  onSuccessInterceptorResponse,
  onErrorInterceptorResponse,
);

/**
 *
 * @NOTE primary methods axios
 *
 */
class AxiosXHRConstructor {
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.$get = this.$get.bind(this);
    this.$getWithAuth = this.$getWithAuth.bind(this);
    this.$post = this.$post.bind(this);
    this.$put = this.$put.bind(this);
    this.$delete = this.$delete.bind(this);
  }

  public $getWithAuth(url: string, params?: objectType): AxiosPromise {
    return this.axiosInstance.get(url, params);
  }

  public $get(
    url: string,
    params?: objectType,
    config?: objectType,
  ): AxiosPromise {
    return this.axiosInstance.get(url, {
      params,
      ...config,
    });
  }

  public $post(
    url: string,
    data?: objectType,
    config?: objectType,
  ): AxiosPromise {
    return this.axiosInstance.post(url, data, config);
  }

  public $put(
    url: string,
    data?: objectType,
    config?: objectType,
  ): AxiosPromise {
    return this.axiosInstance.put(url, data, config);
  }

  public $delete(
    url: string,
    data?: objectType,
    config?: objectType,
  ): AxiosPromise {
    return this.axiosInstance.delete(url, {
      data,
      ...config,
    });
  }
}

export const BaseXHR = new AxiosXHRConstructor(_axios);

export default _axios;

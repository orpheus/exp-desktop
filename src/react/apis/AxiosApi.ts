import axios, { AxiosRequestConfig, Method } from 'axios'

class AxiosApi<ApiRequestConfig extends AxiosRequestConfig, R> {
  constructor (
    public method: Method,
    public url: string,
  ) {}

  async call ({
    data,
    params,
    responseType,
    ...axiosRequestConfig
  }: ApiRequestConfig): Promise<R> {
    return (await axios({
      method: this.method,
      url: this.url,
      data: data,
      params: params,
      responseType: responseType || 'json',
      headers: {
        // Authorization: `Bearer ${window.localStorage.getItem('jwt')}`, // <- or have it on all calls,
        'content-type': responseType || 'application/json',
        Accept: responseType || 'application/json',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, private, max-age=0',
        ...axiosRequestConfig.headers
      },
      ...axiosRequestConfig,
    })).data
  }
}

export default AxiosApi

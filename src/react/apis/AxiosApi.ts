import axios from 'axios'

class AxiosApi {
  url: string
  method: string

  constructor ({ method, url }: IAxiosApi) {
    this.url = url
    this.method = method
  }

  async call ({ data, params, config }: ICallArgs) {
    return (await axios({
      method: this.method,
      url: this.url,
      data: data,
      params: params,
      ...config
    })).data
  }
}

export default AxiosApi

export interface IAxiosApi {
  method: string,
  url: string
}

export interface ICallArgs {
  data?: object | string
  params?: object
  config?: object
}
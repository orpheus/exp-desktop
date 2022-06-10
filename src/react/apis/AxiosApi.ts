import axios from 'axios'

class AxiosApi {
  url: string
  method: string

  constructor ({ method, url }: IAxiosApi) {
    this.url = url
    this.method = method
  }

  async call ({ data, params, axiosConfig }: IAxiosArgs) {
    return (await axios({
      method: this.method,
      url: this.url,
      data: data,
      params: params,
      ...axiosConfig
    })).data
  }
}

export default AxiosApi

export interface IAxiosApi {
  method: string,
  url: string
}

export interface IAxiosArgs {
  data?: object
  params?: object
  axiosConfig?: object
}
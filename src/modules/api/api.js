import axios from "axios";
import config from "./config.js";
import qs from "qs";
const base = "/api"; // 更改的base
/**
 * @description 封装了axios的调用方式，得到的直接是接口返回的数据，对于code
 * 这里做了判断
 * @author 刘欢
 * @class API
 */
// request  拦截器
axios.interceptors.request.use(function (config) {
  if(config.method === 'post') {
    config.data = qs.stringify( {
      channel:'wx',
      ...config.data
    })
  }
  return config;

}, function (error) {

  return Promise.reject(error)
})
class API {
  constructor(){
    this.massages = "业务处理成功!";
    //当前接口错误提示
    this.code='000000'||'999999';
    this.loading='1';
  }
  post(params, callback, dailog,errcallback,load=true) {
    if(load){
      this.loading='2';
    }
  
    config.data = params.data || {};
    var dailog = dailog;
    return axios
      .post(`${base}${params.url}`, config.data, config)
      .then(res => {
        let rst = res.data;
        if (rst.code === "000000" || rst.code === "999999") {
          if(load){
          this.loading='3';
          }
          callback && callback(rst.result || {});
          if (dailog) {
            this.massages = rst.message;           
          }
        } else {
          if(load){
            this.loading='3';
          }
          errcallback && errcallback(rst.message || {});
          this.massages=rst.message;
         
        }
        return res
      })
      .catch(e => {
        if(load){
          this.loading='3';
        }
       
        console.log(e);
      });
  }
  get(params, callback, errcallback) {
    config.data = params.data || {};
    return axios
      .get(`${base}${params.url}`, { params: {channel:'wx',...config.data} }, config)
      .then(res => {
        let rst = res.data;
        if (rst.code === "000000") {
          callback && callback(rst.result || {});
        } else {
          console.log(rst.message);
          errcallback && errcallback(rst.message || {});
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
}
const api = new API();
export default api;

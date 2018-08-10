/*
 * @Author: 刘欢
 * @Date: 2017-11-06 10:23:09
 * @Last Modified by: luckelectricity
 * @Last Modified time: 2017-12-07 11:39:50
 */
import Qs from "qs";
export default {
  url: "",
  method: "get",

    // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
      data=>data

  ],

  transformResponse: [
    data=>data
  ],

  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  params: {},

  paramsSerializer: (params) => {
     Qs.stringify(params);
  },
  data: {},
  timeout: 5000,

  withCredentials: false, // default

  responseType: "json", // default
  // 将upload事件注释掉，防止跨域状态下发起option请求

  // onUploadProgress: function(progressEvent) {
  // Do whatever you want with the native progress event
  // },

  // onDownloadProgress: function(progressEvent) {
  // Do whatever you want with the native progress event
  // },

  maxContentLength: 2000,

  validateStatus: function(status) {
    return status >= 200 && status < 300; // default
  },

  maxRedirects: 5 // default
};

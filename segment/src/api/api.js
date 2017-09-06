import axios from 'axios';
import qs from 'qs';

let base = '/node';

// 注册
export const REGISTER = params => { return axios.post(`${base}/users/register`),qs.stringify(params); };


// 获取用户列表
export const GET_USER_LIST = params=>{ return axios.get(`${base}/users`,{params:params});};

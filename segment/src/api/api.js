// import axios from 'axios';
import axios from './http';
import qs from 'qs';

let base = '/node';

// 注册
export const REGISTER = params => { return axios.post(`${base}/users/register`, qs.stringify(params)); };

// 登录
export const LOGIN = params =>{ return axios.post(`${base}/users/login`,qs.stringify(params));};

// 退出登录
export const LOGOUT = params =>{ return axios.get(`${base}/users/logout`, {params:params});};

// 提交提问
export const SUBMIT_QUESTION = params => { return axios.post(`${base}/question/ask_question`,qs.stringify(params));};

// 问题列表
export const QUESTION_LIST = params => {return axios.get(`${base}/question/question_list`, {params:params});};

// 获取问题详情
export const QUESTION_DETAIL = params => { return axios.get(`${base}/question/question_detail`,{params:params});};


//===========================================================================

// 获取用户列表
export const GET_USER_LIST = params=>{ return axios.get(`${base}/users/getlist`,{params:params});};

import axios from 'axios';
import qs from 'qs';


let base = '/node';

export const GET_USER_LIST = params=>{ return axios.get(`${base}/users`,{params:params});};

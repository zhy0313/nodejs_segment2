import axios from 'axios';
import router from '../router/router';

// http request 拦截器


// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.code == 402){
            console.log('登录过期');
            // router.replace({path:'/login'})
            return;
        }
       
    });

export default axios;
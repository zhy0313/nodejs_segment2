import axios from 'axios';
import store from '../vuex/store';


// http response 拦截器
axios.interceptors.response.use(
    (response) => {
        if(response.data.code == 402){
            // alert('登录过期,请重新登录');
            let payload = {
                hasLogin: true,
                isOverdue: true
            };
            store.commit('reLogin',payload);
            sessionStorage.removeItem('segUser');
            return;
        }
        return response;
    }
);
export default axios;
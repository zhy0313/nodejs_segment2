import axios from 'axios';
import store from '../vuex/store';


// http response 拦截器
axios.interceptors.response.use(
    (response) => {
        if(response.data.code == 402){
            let payload = {
                hasLogin: true,
                isOverdue: true,
                showLogin: true
            };
            store.commit('reLogin',payload);
            return;
        }
        return response;
    }
);
export default axios;
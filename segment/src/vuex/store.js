import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        hasLogin:false
    },

    mutations:{
        // 检测登录
        checkLogin(state){
            if(sessionStorage.getItem('segUser')){
                console.log('已登录');
                state.hasLogin = true;
            }else {
                console.log('未登录');
                state.hasLogin = false;
            }
        },


    }
});



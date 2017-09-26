import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        hasLogin:false, //是否登录
        isOverdue: false,    // 是否登录过期
        writeTypeCode: -1  //一级导航
    },

    mutations:{
        // 还原state
        resetState(state,payload){
            state.writeTypeCode = payload.writeTypeCode;
        },

        
        // 更新一级导航
        updateWriteTypeCode(state,payload){
            state.writeTypeCode = payload;
            let data = JSON.stringify(state);
            sessionStorage.setItem('segment_state',data);
        },
        
        // 重新登录
        reLogin(state,payload){
            console.log('重新登录22',payload);
            state.hasLogin = payload.hasLogin;
            state.isOverdue = payload.isOverdue;
            
        },

        // 检测登录
        // checkLogin(state){
        //     if(sessionStorage.getItem('segUser')){
        //         console.log('已登录');
        //         state.hasLogin = true;
        //     }else {
        //         console.log('未登录');
        //         state.hasLogin = false;
        //     }
        // },
    }
});



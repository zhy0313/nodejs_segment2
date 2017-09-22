import Vue from 'vue';
import store from '../vuex/store';
import Router from 'vue-router';
import Layout from '@/pages/Layout';
import UserIndex from '@/pages/user/UserIndex';
import QuestionList from '@/pages/main/QuestionList';
import Ask from '@/pages/main/Ask';
import QuestionDetail from '@/pages/main/QuestionDetail';


Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect:'/question',   // 重定向到问答页
        children:[
            { path:'/myindex', component:UserIndex, name:'我的主页' },
            { path:'/question', component:QuestionList, name:'问答' },
            { path:'/ask', component:Ask, name:'提问' },
            { path:'/q/:q_id', component:QuestionDetail, name:'问题详情' },
        ]
    }
];

const router = new Router({routes});

// 导航钩子
router.beforeEach((to, from, next) => {

    // 更新一级导航状态
    if(to.path == '/question' || to.path == '/myindex'){
        store.commit('updateWriteTypeCode',-1);
    }
    next();
});

export default router;

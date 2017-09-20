import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/pages/Layout';
import UserIndex from '@/pages/user/UserIndex';
import QuestionList from '@/pages/main/QuestionList';
import Ask from '@/pages/main/Ask';
import QuestionDetail from '@/pages/main/QuestionDetail';

Vue.use(Router);

export default new Router({
    routes: [
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
    ]
});

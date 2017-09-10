import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/pages/Layout';
import MyIndex from '@/pages/user/MyIndex';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Layout',
            component: Layout,
            children:[
                { path:'/myindex', component:MyIndex, name:'我的主页' }
            ]
        }
    ]
});

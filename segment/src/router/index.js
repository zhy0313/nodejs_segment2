import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/pages/Layout';
import UserIndex from '@/pages/user/UserIndex';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Layout',
            component: Layout,
            children:[
                { path:'/myindex', component:UserIndex, name:'我的主页' }
            ]
        }
    ]
});

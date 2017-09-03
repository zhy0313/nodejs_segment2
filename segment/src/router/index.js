import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Layout from '@/pages/Layout';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Layout',
            component: Layout
        }
    ]
});

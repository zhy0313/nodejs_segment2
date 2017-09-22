// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/router';
import store from './vuex/store';


// 富文本框
import VueQuillEditor from 'vue-quill-editor';
Vue.use(VueQuillEditor);


// 表单验证
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

// 格式化css
import './assets/css/reset.css';
import './assets/css/common.css';

// iconfont
import './assets/css/iconfont/iconfont.css';
import './assets/css/iconfont/iconfont2.css';

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});

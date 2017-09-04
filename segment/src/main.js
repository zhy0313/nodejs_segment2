// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VeeValidate from 'vee-validate';


// 格式化css
import './assets/css/reset.css';
import './assets/css/common.css';

// iconfont
import './assets/css/iconfont/iconfont.css';

Vue.config.productionTip = false;

// 表单验证
const config = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fields',
    delay: 0,
    locale: 'cn',
    dictionary: null,
    strict: true,
    classes: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true,
    validity: true,
    aria: true
};
Vue.use(VeeValidate,config);



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});

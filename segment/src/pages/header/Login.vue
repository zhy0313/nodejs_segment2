<template>
    <!-- 登录/注册框 -->
    <div class="login">
        <!-- 登录/注册 -->
        <div class="user-wrapper">
            <div class="title">
                <span>登录</span>
                <span class="overdue" v-if='showOverdue'>登录过期,请重新登录</span>
                <span class="close pointer" @click='hide'>×</span>
            </div>
            <!-- 注册框 -->
            <div class="register">
                <div class="sub-title">注册新帐号</div>
                <label for="name" class="name">名字</label>
                <input type="text" id='name' placeholder="真实姓名或常用昵称" v-model.trim="register.name">
                <div class="notice" v-if='validate.name'>{{validate.nameMsg}}</div>
                <label><input type="radio" id="usePhone" v-model ="register.typeRadio" value="0" class="type-radio"> 用手机号注册</label>
                <label><input type="radio" id="useEmail" v-model ="register.typeRadio" value="1" class="type-radio email-radio">用Email注册</label>
                <!-- 手机号注册  -->
                <div class="register-phone" v-if="register.typeRadio == 0">
                    <input type="tel" placeholder="请输入手机号" v-model.trim="register.mobile">
                    <div class="notice"  v-if="validate.regMobile">{{validate.mobileMsg}}</div>
                    <div class="code-wrapping">
                        <input type="text" placeholder="短信验证码" class='msg-code' v-model.trim="register.code">
                        <input type="button" :value="telCode" class="get-code pointer" @click="getMobileCode" ref="getCode">
                    </div>
                    <div class="notice" v-if='validate.code'>{{validate.codeMsg}}</div>
                </div>
                <!-- email注册 -->
                <div class="register-email" v-else>
                    <input type="tel" placeholder="请输入邮箱" v-model.trim="register.email">
                    <div class="notice"  v-if="validate.regEmail">{{validate.emailMsg}}</div>
                </div>   

                <label for="pwd" class="pwd">密码<input type="password" id="pwd" placeholder="不少于6位" v-model.trim="register.pwd" @keydown.enter='registerHandler'></label>
                <div class="notice" v-if='validate.regPwd'>密码不少于6位</div>
                <div class="agreement-wrapper clearfix">
                    <div class="agreement">同意并接受<a class="contract" href='#'>《服务条款》</a></div>
                    <input type="button" value="注册" class="btn-register pointer" @click="registerHandler">
                </div>
            </div>

            <!-- 登录框 -->
            <div class="login">
                <div class="sub-title">用户登录</div>
                <label for="userName" class="user-name">手机号或Email</label>
                <input type="text" id="userName" placeholder="11位手机号或email" v-model="login.user">
                <div class="notice" v-if='validate.loginMobile'>{{validate.loginMsg}}</div>
                <div class="pwd-wrapper clearfix">
                    <label for="pwd" class="pwd">密码</label>
                    <span class="foget-pwd pointer">忘记密码</span>
                </div>
                <input type="password" placeholder="密码" v-model="login.pwd" @keyup.enter="loginHandler">
                <div class="notice" v-show="validate.loginPwd">{{validate.loginPwdMsg}}</div>
                <div class="login-wrapper">
                    <label> <input type="checkbox" v-model="rememberPwd" class="remember-status">记住登录状态</label>
                    <input type="button" value="登录" class="btn-login pointer" @click="loginHandler">
                </div>
            </div>
        </div>
        <!-- mask -->
        <div class="mask" @click="hide"></div>
    </div>
</template>

<script>
import { GET_USER_LIST, LOGIN,  REGISTER } from '@/api/api'

export default {
    data(){
        return {
            validate:{
                name:false,
                regMobile:false,
                regEmail:false,
                code:false,
                regPwd:false,
                loginMobile:false,
                loginPwd:false,
                nameMsg:'请输入用户名',
                emailMsg:'请输入正确email',
                mobileMsg:'请输入手机号',
                codeMsg:'请输入4位验证码',
                loginMsg: '请输入帐号',
                loginPwdMsg: '请输入密码'
            },  
            rememberPwd: true,
            telCode:'获取验证码',
            register:{  //注册
                name:'',
                typeRadio:0,
                mobile: '',
                email: '',
                code: '',
                pwd: ''
            },
            login: {    //登录
                user: '',
                pwd: ''
            }
          
        }
    },
    computed:{
        showOverdue(){
            return this.$store.state.isOverdue;
        }
    },
    methods:{
        // 获取短信验证码
        getMobileCode(){
            let sec = 50
            this.$refs.getCode.disabled = true
            let setTime = setInterval(()=>{
                if( sec > 1){
                    sec--
                    this.telCode = `${sec}s`
                    setTime;
                }else{
                    clearInterval(setTime)
                    this.telCode = '获取验证码'
                    this.$refs.getCode.disabled = false
                }
            },1000)
        },

        // 注册
        registerHandler(){
            let para = {
                name: this.register.name,
                pwd: this.register.pwd,
                mobile : this.register.mobile,
                email: this.register.email
            }

            if(this.register.typeRadio == 0) {
                para.email = '';
            }else if(this.register.typeRadio == 1){
                para.mobile = '';
            }

            // 注册验证
            if( this.validateReg() ){
                REGISTER(para).then(res=>{
                    let data = res.data;
                    console.log(res)
                    if(data.code == 200){   //注册成功
                        let msg = JSON.stringify(data.msg)
                        sessionStorage.setItem('segUser',msg)
                        this.hide(); 
                        this.hasLogin();
                    }else if( data.code == 400 ){ //注册失败
                        switch(data.errType){
                            case 'name':
                                this.validate.name = true;
                                this.validate.nameMsg = '该用户名已被注册';
                                break;
                            case 'email':
                                this.validate.regEmail = true;
                                this.validate.emailMsg = '该邮箱已被注册';
                                break;
                            case 'mobile':
                                this.validate.regMobile = true;
                                this.validate.mobileMsg = '该手机号已被注册';
                                break;
                            default:
                                break;    
                        }
                    }
                })
            }
        },

        // 登录
        loginHandler(){
            // 登录验证
            if (!this.validateLogin()) return;

            // 验证通过
            let para = {
                user: this.login.user,
                pwd: this.login.pwd
            }
            LOGIN(para).then(res=>{
                if(res.data.code == 400){
                    this.validate.loginMobile = true
                    this.validate.loginPwd = true
                    this.validate.loginMsg = res.data.msg;
                    this.validate.loginPwdMsg = res.data.msg;
                }else {
                    let data = JSON.stringify(res.data.msg)
                    sessionStorage.setItem('segUser',data)
                    this.hide();
                    this.hasLogin();
                }
            })

        },

        // 表单验证-注册
        validateReg(){
            // 重置状态
            this.validate = {
                name:false,
                regMobile:false,
                regEmail:false,
                code:false,
                regPwd:false,
                emailMsg:'请输入正确email',
                mobileMsg:'请输入手机号',
                codeMsg:'请输入4位验证码'
            }

            let regexMob = /^1[3|5|7|8]\d{9}/   // 验证手机号
            let regexEmail = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/    // 验证邮箱

            if( !this.register.name ){
                this.validate.name = true;
                return
            }
            if( !this.register.mobile && this.register.typeRadio == 0  ){
                this.validate.regMobile = true
                return
            }
            if( !regexMob.test(this.register.mobile) && this.register.typeRadio == 0 ){
                this.validate.regMobile = true
                this.validate.mobileMsg = '请输入11位手机号'
                return
            }
            if(!regexEmail.test(this.register.email) && this.register.typeRadio == 1){
                this.validate.regEmail = true
                this.validate.emailMsg = '请输入正确的Email'
                return
            }
            if( this.register.typeRadio == 0 && this.register.code.length !== 4 ){
                this.validate.code = true
                return
            }
            if(this.register.pwd.length < 6){
                this.validate.regPwd = true
                return
            }
            
            return true
        },

        // 表单验证-登录
        validateLogin(){
            // 重置状态
            this.validate = {
                loginMobile:false,
                loginPwd:false,
                loginMsg: '请输入帐号',
                loginPwdMsg: '请输入密码'
            }
            if(!this.login.user){
                this.validate.loginMobile = true
                return 
            }
            if(!this.login.pwd){
                this.validate.loginPwd = true
                return 
            }
            return true
        },
        

       

        // 关闭登录注册框
        hide(){
            this.$emit('hide')
        },

        // 登录成功
        hasLogin(){
            this.$emit('hasLogin')
        }
    },

    created(){
        
    }

}
</script>

<style lang="less" scoped>
    @import '../../assets/css/mixin.less';

    .login {
        // 登录注册
        .user-wrapper {
            position: absolute;
            top:50px;
            left: 50%;
            z-index: 10;
            margin-left: -450px;
            width:900px;
            height: 550px;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 5px;
            font-size: 0;

            // 注册验证
            .notice {
                color:red;
            }

            .title {
                height: 58px;
                line-height: 58px;
                font-size: 18px;
                text-align: left;
                text-indent: 16px;
                border-bottom: 1px solid #e5e5e5;
                background-color: #f3f3f3;
                border-radius: 5px 5px 0 0;

                // 过期
                .overdue {
                    color:red;
                    font-size: 12px;
                }

                // 关闭按钮
                .close {
                    float: right;
                    font-size: 25px;
                    font-weight: 500;
                    margin-right: 20px;
                    color:#c2c2c2;

                    &:hover {
                        color:#999;
                    }
                }
            }

            // 注册/登录
            .register,.login {
                display: inline-block;
                width:450px;
                box-sizing: border-box;
                font-size: 14px;
                margin-top:60px;
                text-align: left;

                .sub-title {
                    font-size: 20px;
                    margin-bottom: 30px;
                }

                input {
                    display: block;
                    width:288px;
                    height: 30px;
                    box-sizing: border-box;
                    border:1px solid #ccc;
                    border-radius: 4px;
                    text-indent: 10px;
                    margin:10px 0;
                }
                
                //  手机号注册/Email注册/记住登录状态
                .type-radio, .remember-status {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    vertical-align: middle;
                    margin-right: 3px;
                }

                .email-radio {
                    margin-left: 10px;
                }

                // 名字/密码/手机号或email
                .name,.pwd,.user-name {
                    display: block;
                    text-align: left;
                    color:#222;
                    font-weight: 700;
                }
                
                 // 服务条款/注册按钮/登录状态/登录按钮
                .agreement-wrapper,.login-wrapper  {
                    box-sizing: border-box;
                    padding-right: 10px;

                    .agreement {
                        display: inline-block;
                        vertical-align: middle;
                        line-height: 30px;
                        color:#222;
                    }
                    
                    a {
                        color:@green;
                    }

                    // 注册按钮
                    .btn-register, .btn-login {
                        float: right;
                        width: 70px;
                        background-color: @green;
                        color:#fff;
                        font-weight: 500;
                        text-indent: 0;
                        margin:0;
                    }
                }
            }

            // 注册
            .register {
                border-right: solid 1px #e5e5e5;
                padding-left: 82px;
                padding-right: 68px;

                // 验证码包裹层
                .code-wrapping {
                    position: relative;
                    font-size: 0;

                    // 验证码输入框
                    .msg-code {
                        display: inline-block;
                        font-size: 14px;
                        width:194px;
                        border-radius: 4px 0 0 4px;
                        border-right: none;
                    }

                    // 获取验证码
                    .get-code {
                        display: inline-block;
                        font-size: 14px;
                        width: 96px;
                        border-radius: 0 4px 4px 0;
                        text-indent: 0;
                        background-color: #fff;
                    }
                }
            }

            // 登录
            .login {
                vertical-align: top;
                padding-right: 82px;
                padding-left: 68px;

                // 密码/记住密码
                .pwd-wrapper {
                    box-sizing: border-box;    
                    padding-right: 10px;
                    .pwd {
                        display: inline-block;
                        vertical-align: middle;
                        width: 100px;
                    }
                    .foget-pwd {
                       float:right; 
                       color:@green; 
                    }
                }
            }
        }
    }
</style>
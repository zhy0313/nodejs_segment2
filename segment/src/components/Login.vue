<template>
    <!-- 登录/注册框 -->
    <div class="login">
        <!-- 登录/注册 -->
        <div class="user-wrapper">
            <div class="title">
                <span>登录</span>
                <span class="close pointer" @click='hide'>×</span>
            </div>
            <div class="register">
                <div class="sub-title">注册新帐号</div>
                <label for="name" class="name">名字</label>
                <input type="text" id='name' placeholder="真实姓名或常用昵称" v-model.trim="register.name">
                <div class="notice" v-show='validate.user'>请输入用户名</div>
                <label><input type="radio" id="usePhone" v-model ="register.typeRadio" value="1" class="type-radio"> 用手机号注册</label>
                <label><input type="radio" id="useEmail" v-model ="register.typeRadio" value="2" class="type-radio email-radio"> 用Email注册</label>
                <input type="tel" placeholder="仅支持大陆手机号" v-model.trim="register.mobile">
                <div class="notice" v-show="validate.regMobile">请输入手机号</div>
                <div class="code-wrapping">
                    <input type="text" placeholder="短信验证码" class='msg-code' v-model.trim="register.code">
                    <input type="button" :value="telCode" class="get-code pointer">
                </div>
                <div class="notice" v-show='validate.code'>请输入验证码</div>
                <label for="pwd" class="pwd">密码<input type="text" id="pwd" placeholder="不少于6位" v-model.trim="register.pwd"></label>
                <div class="notice" v-show='validate.regPwd'>请设置密码</div>
                <div class="agreement-wrapper clearfix">
                    <div class="agreement">同意并接受<a class="contract" href='#'>《服务条款》</a></div>
                    <input type="button" value="注册" class="btn-register pointer" @click="getRegister">
                </div>
            </div>
            <div class="login">
                <div class="sub-title">用户登录</div>
                <label for="userName" class="user-name">手机号或Email</label>
                <input type="text" id="userName" placeholder="11位手机号或email">
                <div class="notice" v-show='validate.loginMobile'>请输入正确的手机号</div>
                <div class="pwd-wrapper clearfix">
                    <label for="pwd" class="pwd">密码</label>
                    <span class="foget-pwd pointer">忘记密码</span>
                </div>
                <input type="text" placeholder="密码">
                <div class="notice" v-show="validate.loginPwd">请输入密码</div>
                <div class="login-wrapper">
                    <label> <input type="checkbox" v-model="rememberPwd" class="remember-status">记住登录状态</label>
                    <input type="button" value="登录" class="btn-login pointer">
                </div>
            </div>
        </div>
        <!-- mask -->
        <div class="mask" @click="hide"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            validate:{
                user:false,
                regMobile:false,
                code:false,
                regPwd:false,
                loginMobile:false,
                loginPwd:false
            },
            rememberPwd: true,
            telCode:'获取验证码',
            register:{
                name:'',
                typeRadio:1,
                mobile: '',
                code: '',
                pwd: ''
            }
        }
    },
    
    methods:{
        // 关闭验证
        stopValidate(val,text){
            // console.log('val',val)
            // console.log(this.register.user)
        },
        // 注册
        getRegister(){
            let para = {
                name: this.register.name,
                mobile: this.register.mobile,
                typeRadio: this.register.typeRadio,
                code: this.register.code,
                pwd: this.register.pwd
            }

            this.getValidate();
           
        },

        

        

       

        // 关闭登录注册框
        hide(){
            this.$emit('hide')
        }
    },

    updated(){
        
    },

    created(){
    }

}
</script>

<style lang="less" scoped>
    @import '../assets/css/mixin.less';

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
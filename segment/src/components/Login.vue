<template>
    <!-- 登录/注册框 -->
    <div class="login">
        <!-- 登录/注册 -->
        <div class="user-wrapper">
            <div class="title">登录</div>
            <div class="login">
                <div class="sub-title">注册新帐号</div>
                <label for="name">名字</label>
                <input type="text" id='name' placeholder="真实姓名或常用昵称">
                
                <label><input type="radio" id="usePhone" v-model="usePhone" value="1"> 用手机号注册</label>
               
                <label><input type="radio" id="useEmail" v-model="usePhone" value="2"> 用Email注册</label>
                <input type="tel" placeholder="仅支持大陆手机号">
                <div class="code-wrapping">
                    <input type="text" placeholder="短信验证码">
                    <input type="button" value="获取验证码">
                </div>
                <label for="pwd">密码<input type="text" id="pwd" placeholder="不少于6位"></label>
                <div class="agreement">同意并接受<a class="contract" href='#'>《收服务条款》>></a></div>
                <input type="button" value="注册" class="btn-register">
            </div>
            <div class="register">
                <div class="sub-title">用户登录</div>
                <label for="userName">手机号或Email</label>
                <input type="text" id="userName" placeholder="11位手机号或email">
                <label for="pwd">密码</label>
                <span class="foget-pwd">忘记密码</span>
                <input type="text" placeholder="密码">
                <label> <input type="checkbox" v-model="rememberPwd">记住登录状态</label>
                <input type="button" value="登录">
            </div>
        </div>
        <!-- mask -->
        <div class="mask"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            usePhone:'',
            rememberPwd: '',
        }
    }
}
</script>

<style lang="less" scoped>
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
            border: solid 1px #ddd;
            box-sizing: border-box;
            background-color: #fff;
            font-size: 14px;
        }
    }
</style>


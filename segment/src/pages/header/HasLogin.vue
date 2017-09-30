<template>
    <!-- 已登录 -->
    <div class="has-login clearfix">
        <div class="btn pointer">
            <span class="btn-ask" @click="goRouter('/ask',0)">提问题</span>
            <span class="btn-arrow"   @mouseover="showSubNav = true" @mouseleave='showSubNav = false'>
                <span class="arrow"></span>
            </span>
            <!-- 提问-下拉菜单 -->
            <ul class="sub-nav-wrapper" v-show="showSubNav"  @mouseover="showSubNav = true" @mouseleave='showSubNav = false'>
                <li class="sub-nav-item"  @click="goRouter('/ask',0)">提问题</li>
                <li class="sub-nav-item" @click="goRouter('/ask',1)">写头条</li>
                <li class="sub-nav-item">写文章</li>
                <li class="sub-nav-item">记笔记</li>
            </ul>
        </div>
        <span class="iconfont icon-remind pointer"></span>
        <span class="iconfont icon-feedback pointer"></span>
        <!-- 账户信息 -->
        <div class="user-info-wrapper"  @mouseover="showUserInfo = true" @mouseleave='showUserInfo = false'>
            <img src="../../assets/images/user.png" alt="" class="user pointer">

            <ul class="user-info pointer" v-show="showUserInfo">
                <li class="info-item" @click="goRouter('/myindex',-1)">我的主页</li>        
                <li class="info-item" @click="logout">退出</li>        
            </ul>
        </div>
    </div>
</template>

<script>
import { LOGOUT } from '@/api/api'
export default {
    data(){
        return {
            showUserInfo: false,
            showSubNav: false,
        }
    },
    methods:{
        // 退出
        logout(){
            LOGOUT().then(res=>{
                if(res.data.code == 200){
                    this.$store.commit('toggleLoginBtn',true)
                    this.$store.commit('saveState')
                    this.$router.push({path:'/question'})
                }
            })
        },

        // 路由跳转
        goRouter(path,type){
            this.$router.push(path)

            // 触发父组件changeWriteMode事件
            this.$emit('changeWriteMode',type)
            
        }
    }
}
</script>

<style lang="less" scoped>
    @import url(../../assets/css/mixin.less);
    
    .has-login {
        width: 244px;
        height: 33px;
        line-height: 34px;
        font-size: 0;
        vertical-align: middle;
        
        //  提问按钮
        .btn {
            width:94px;
            height: 34px;
            line-height: 34px;
            font-size: 0;
            color:#fff;
            background-color: @green;
            border-radius: 3px;
            text-align: left;
            float: left;

            .btn-ask {
                display: inline-block;
                border-right: 1px solid #008151;
                width:68px;
                font-size: 14px;
                font-weight: 500; 
                text-align: center;
                border-radius: 3px 0 0 3px;
                &:hover {
                    background-color: #006741;
                }
                
            }

            .btn-arrow {
                font-size: 14px;
                display: inline-block;
                width:25px;
                height: 100%;
                text-align: center;

                &:hover {
                    background-color: #006741;
                    border-radius: 0 3px 3px 0;
                }

                .arrow {
                    display: inline-block;
                    width:0;
                    height: 0;
                    border: 4px solid transparent;
                    border-top-color: #fff;
                }
            }

            // 文章类型下拉框
            .sub-nav-wrapper {
                position: absolute;
                top:34px;
                width:92px;
                font-size: 14px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0,0,0,0.3);
                background-color: #fff;
                color:@gray-l;
                text-align: center;
                z-index: 2;

                .sub-nav-item {
                    &:hover {
                        background-color: #eee;
                    }
                }
            }

        }



        // 
        .iconfont {
            font-size: 24px;
            float: left;
            padding:0 10px;
            margin-left: 9px;
            &:hover {
                background-color:#eee;
                border-radius: 3px;
            }
            
        }

        // 头像
        .user {
            width: 33px;
            height: 33px;
            border-radius: 50%;
            float: left;
            margin-left: 9px;
        }

        // 账户信息
        .user-info {
            font-size: 14px;
            color:@gray-l;
            width: 120px;
            box-sizing: border-box;
            border: 1px solid #ccc  ;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            background:#fff;
            position: absolute;
            right:0;
            top:32px;

            .info-item {

                &:hover {
                    background-color:#eee;
                }
            }

        }
    }
</style>

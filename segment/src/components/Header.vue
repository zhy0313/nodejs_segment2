<template>
    <div class="nav-header">
        <div class="title-content clearfix">
            <div class="logo pointer">segment<span class="green">fault</span></div>
            <ul class="title-list">
                <li class="title-item active pointer">问答</li>
                <li class="title-item pointer">头条</li>
                <li class="title-item pointer">专栏</li>
                <li class="title-item pointer">讲堂</li>
                <li class="title-item pointer">职位</li>
                <li class="title-item pointer">活动</li>
            </ul>
            <div class="search-wrapper">
                <input type="text" placeholder="搜索问题或关键字" class="search-input" id='search'  v-expand>
                <span class="iconfont icon-search pointer"></span>
            </div>
            <div class="btn-wrapper">
                <span class="login pointer" @click='login'>立即登录</span>
                <span class="register pointer"  @click='login'>免费注册</span>
            </div>
        </div>
        <div class="sub-title-content clearfix">
            <!-- 问答列表 -->
            <ul class="sub-title-list" v-if="showQueList">
                <li class="sub-title-item pointer"  v-for="(item,index) in questionList" :key="index">{{item.label}}</li>
                <li class="sub-title-item hot-tag pointer">热门标签</li>
            </ul>

            <!-- 新闻列表 -->
            <ul class="sub-title-list" v-else>
                <li class="sub-title-item pointer" v-for="(item,index) in newsList" :key="index">{{item.label}}</li>
            </ul>
        </div>
        <!-- 登录/注册 -->
        <login @hide='hide' v-show="showLogin"></login>
    </div>
</template>
<script>
import Login from './Login';

export default {
    components:{
        Login
    },
    data(){
        return{
            showLogin:false,
            showQueList:true,
            questionList:[
                { id:0,label:'全部'},
                { id:1,label:'javascript'},
                { id:2,label:'php' },
                { id:3,label:'python' },
                { id:4,label:'java' },
                { id:5,label:'mysql' },
                { id:6,label:'ios' },
                { id:7,label:'android' },
                { id:8,label:'node.js' },
                { id:9,label:'html5' },
                { id:10,label:'linux' },
                { id:11,label:'c++' },
                { id:12,label:'css3' },
                { id:13,label:'git' },
                { id:14,label:'golang' },
                { id:15,label:'ruby' },
                { id:16,label:'vim' },
                { id:17,label:'docker' },
                { id:18,label:'mongodb' }
            ],
            newsList: [
                { id:0, label:'全部' },
                { id:1, label:'前端' },
                { id:2, label:'后端' },
                { id:3, label:'IOS' },
                { id:4, label:'Android' },
                { id:5, label:'安全' },
                { id:6, label:'人工只能' },
                { id:7, label:'工具' },
                { id:8, label:'程序员' },
                { id:9, label:'行业' },
                { id:10, label:'SF官方' }
            ],
        }
    },

    methods:{
        hide(){
            this.showLogin = false;
        },

        login(){
            this.showLogin = true
        }
    },

    directives: {
        // 注册一个局部的自定义指令 v-expand
        expand: {
            // 指令的定义
            inserted: function(el) {
                // 获取焦点
                el.onfocus = function(){
                    console.log(el.parentNode)
                    el.style = "border:1px solid #3b99fc; box-shadow:0 0 3px 0 #3b99fc";  // 添加阴影
                    el.parentNode.style="width:650px;"  // 展开 
                }

                // 失去焦点
                el.onblur = function(){
                    el.style = "box-shadow:0 0 0 0 #fff"; //去除阴影
                    el.parentNode.style="width:278px;"  // 收起
                }
                
            }
        }
    },  
   

    created(){
    }
}
</script>

<style lang="less" scoped>
    @import '../assets/css/mixin.less';

    .nav-header {
        font-size: 0;
        width: 100%;
        position: relative;
        padding-top: 20px;
        min-height: 64px;
        color: @gray-l;
        background-color: #fafafa;
        border-top: 4px solid @green;
        border-bottom: 1px solid #d6d6d6;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);

        // 一级导航
        .title-content{
            position: relative;
            width: 1116px;
            margin:0 auto;
        
            // logo
            .logo {
                line-height: 64px;
                font-size: 27px;
                font-weight: 700;
                color:#333;
                float: left;
                .green {
                    color: @green;
                }
            }

            // 头部一级导航栏
            .title-list {
                float: left;
                margin-left: 20px;
                margin-top: 20px;
                width:368px;
                font-size: 16px;
                font-weight: 600;
            

                .title-item {
                    float: left;
                    width:60px;
                    padding: 5px 0;
                    border-radius: 3px;
                    text-align: center;
                    &:hover {
                        background-color: #efefef;
                    }

                    // 激活状态
                    &.active {
                        color: @green;
                    }
                }

            }

            //问题搜索框
            .search-wrapper {
                position: absolute;
                top: 15px;
                right: 284px;
                z-index: 1;
                width: 248px;
                height: 30px;
                transition: all 0.25s ease-in-out;

                .search-input {
                    display: inline-block;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    text-indent: 12px;
                    border-radius: 4px;
                    -webkit-appearance: textfield;
                    outline: none;
                    border:1px solid #ddd;
                    padding-right: 30px;
                }

                .icon-search {
                    display: inline-block;
                    position: absolute;
                    top:9px;
                    right: -20px;
                }
            }

            // 登录/注册按钮
            .btn-wrapper {
                position: absolute;
                right: 0;
                top: 20px;
                font-size: 0;

                .login,.register {
                    font-size:14px;
                    font-weight: 500;
                    padding:10px 15px;
                    border-radius: 4px;
                    margin: 0 5px;
                }

                .login {
                    color:@green;
                    &:hover {
                        background-color:#efefef;
                    }
                }

                .register {
                    color:#fff;
                    background-color:@green;

                    &:hover {
                        background-color:#008151;
                    }
                }
            }


        }

        // 二级导航
        .sub-title-content {
            height: auto;
            width:1116px;
            margin:0 auto;
            text-align: left;

            .sub-title-list {
                width:100%;
                height: 40px;
                line-height: 40px;
                font-size: 0;
                border-top:1px solid #d6d6d6;

                .sub-title-item {
                    display: inline-block;
                    font-size: 14px;
                    margin-right:19px;

                    &.hot-tag {
                        float: right;
                        margin:0;
                    }
                }
            }
        }
    }
</style>


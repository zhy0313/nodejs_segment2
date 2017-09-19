<template>
    <!-- layout -->
    <div class="layout">
        <!-- 头部导航 -->
        <nav-header></nav-header>
        <!-- 页面主体 -->
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavHeader from './header/Header';
export default {
    components:{
        NavHeader
    },

    data(){
        return {

        }
    }
    
}
</script>

<style lang="less" scoped>
    @import '../assets/css/mixin.less';

    .layout {
        // width: 1116px;
        margin: 0 auto;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        font-size: 16px;

    }

</style>


<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <ul>
            <li v-for="(item,index) in userList" :key="index" >
                    {{item.username}} - {{item.email}}
            </li>
        </ul>
    </div>
</template>

<script>
import { GET_USER_LIST } from '@/api/api';

export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            userList:[]
        }
    },
    methods:{
        getUserList(){
            GET_USER_LIST().then(res=>{
                if(res.data.code == 200){
                    this.userList = res.data.data
                }
            })
        }
    },
    mounted(){
       this.getUserList(); 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
    li {
        margin: 0 10px;
        a {
            color: red;
        }
    }
}
</style>

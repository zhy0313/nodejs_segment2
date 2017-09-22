<template>
    <div class="question-detail">
        <div class="question-title">
            <span class="icon">问</span>
            <p class="title">{{questionTitle}}</p>
            <div class="tag-user">
                <ul class="tag">
                    <li class="tag-item" v-for="(item,index) in tags" :key='index'>{{item}}</li>
                </ul>
                <span class="user">{{username}}</span>
                <span class="time">{{time}}前提问</span>
            </div>
        </div>
        <div class="html ql-editor" v-html="questionDetail"></div>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import { QUESTION_DETAIL } from '@/api/api'

export default {
    data(){
        return {
            questionTitle:'',
            username:'',
            time: '5h前',
            tags:['html','css'],
            userId:'',
            questionDetail:"", 
            q_id:0,
            content:"",
            editorOption: {
                modules: {
                    toolbar: [
                        [{ 'size': ['small', false, 'large'] }],
                        ['bold', 'italic'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image']
                    ],
                    history: {
                        delay: 1000,
                        maxStack: 50,
                        userOnly: false
                    }
                },
                placeholder:' '
            }
        }
    },
    methods:{
        // 获取问题详情
        getQueDetail(){
            let para = {
                q_id: this.q_id
            }
            QUESTION_DETAIL(para).then(res=>{
                console.log(res.data)
                let data  = res.data
                if(data.code === 200){
                    this.questionTitle = data.data.title
                    this.questionDetail = data.data.content
                    this.username = data.data.username
                    this.tags = data.data.tags.split(',')
                    // 计算时间
                    let create_time = new Date(data.data.create_time);
                    let now = new Date();
                    let sec = (now - create_time)/1000;    // 转换为s
                    let min = sec/60;
                    let hour = min/60;
                    let day = hour/24

                    if(Math.round(min) < 1){
                        this.time = Math.round(sec)+'秒'
                    }
                    else if(Math.round(hour) < 1){
                        this.time = Math.round(min) + '分钟'
                    }
                    else if(Math.round(day)< 1){
                        this.time = Math.round(hour) + '小时'
                    }
                    else {
                        this.time = Math.round(day) + '天'
                    }
                }
            })    
        }
    },
    mounted(){
        this.getQueDetail();
    },
    created(){
        this.q_id = this.$route.params.q_id
    }
}
</script>
<style lang="less" scoped>
    @import url(../../assets/css/mixin.less);
    .question-detail {
        width: 1116px;
        margin:29px auto 0;
        font-size: 14px;
        text-align: left;

        // 问题标题
        .question-title {
            // 图标
            .icon {
                display: inline-block;
                width:30px;
                height: 30px;
                line-height: 30px;
                font-size:14px;
                text-align: center;
                background-color:#fff;
                color: @green;
                border:1px solid @green;
                box-sizing: border-box;
                border-radius: 50%;
            }

            // 问题标题
            .title {
                display: inline-block;
                font-size: 20px;
                font-weight: 500;
                color: #333;
                margin-left: 10px;
            }

            // 标签/用户
            .tag-user {
                font-size: 12px;
                margin: 15px 0 20px;
                .tag {
                    display: inline-block;
                    .tag-item {
                        display: inline-block;
                        padding: 3px 5px;
                        background-color: #ebf5f3;
                        color:@green;
                        margin-right: 5px;
                    }
                }

                .user {
                    color: @green;
                    font-weight: 600;
                    margin:0 10px;
                    font-size: 16px;
                }

                .time {
                    color:#999;
                }

            }
            
        }

        // 富文本编辑器
        .ql-editor{
            border:1px solid #ddd;
        }
    }



</style>



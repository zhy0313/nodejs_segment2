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
                <span class="time">{{time}}提问</span>
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
            questionTitle:'问题标题',
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
                this.questionDetail = res.data.data.q_content
                this.username = res.data.data.username
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
                font-size: 16px;
                margin: 10px 0 20px;
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
                }

                .time {
                    color:#ccc;
                }

            }
            
        }

        // 富文本编辑器
        .ql-editor{
            border:1px solid #ddd;
        }
    }



</style>



<template>
    <div class="question-detail">
        <h1>用户:{{username}}</h1>
        <div class="html ql-editor" v-html="questionDetail"></div>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import { QUESTION_DETAIL } from '@/api/api'

export default {
    data(){
        return {
            userId:'',
            questionDetail:"", 
            q_id:0,
            content:"",
            editorOption: {
                // some quill options
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
                console.log(res.data.data)
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
    .question-detail {
        width: 1116px;
        margin:29px auto 0;
        font-size: 14px;
        
        // 富文本编辑器
        .ql-editor{
            border:1px solid #ddd;
        }
    }



</style>



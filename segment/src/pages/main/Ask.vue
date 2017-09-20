<template>
<!-- 提问 -->
    <div class="ask">
        <input type="text" class="title" placeholder="标题: 一句话说明问题" v-model="title">
        <input type="text" class="tag" placeholder="标签" v-model="tag">
        <div class="rich-text-wrapper clearfix">
            <quill-editor v-model="content" 
                ref="myQuillEditor"
                :options="editorOption"
                
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
            </quill-editor>
        </div>
        <div class="btn-wrapper">
            <input type="button" value="提交问题" @click="submit" class="btn-submit">
        </div>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    import { SUBMIT_QUESTION } from '@/api/api'
    export default  {
        components: {
            quillEditor
        },

        data(){
            return {
                title:'',
                tag:'',
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
            // 提交
            submit(){
                let para={
                    title: this.title,
                    tag: this.tag,
                    content: this.content
                }

                // todo
                // 表单验证 错误处理
                SUBMIT_QUESTION(para).then((res)=>{
                    console.log(res);
                    // 成功后跳转到问答页
                    if(res.data.code == 200){
                        this.$router.push({path:'/question'})
                    }
                })
            },


            onEditorBlur(e){

            },
            onEditorFocus(e){

            },
            onEditorReady(e){

            }
        }
    }
</script>
<style lang="less" scoped>
    @import url(../../assets/css/mixin.less);
    .ask {
        width: 1116px;
        margin:0 auto;

        // 标题/标签
        .title,.tag {
            display: block;
            width: 100%;
            margin:10px 0;
            padding:5px 0;
            border:1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            text-indent:10px;
            outline: none;
        }
        // 标题
        .title {
            font-size: 18px;
            padding:10px 0;
            // border:1px solid #3b99fc; 
            // box-shadow:0 0 3px 0 #3b99fc
        }

        // 内容
        .rich-text-wrapper{
            text-align: left;
            height: 550px;
            
            // 内容区
            .quill-editor {
                height: 500px;
            }
        }

        // 提交按钮
        .btn-wrapper {
            height: 30px;
            line-height: 30px;
            text-align: right;

            .btn-submit {
                display: inline-block;
                width:80px;
                height: 34px;
                background-color:@green;
                border:none;
                color:#fff;
                border-radius: 4px;
                text-align: center;
                letter-spacing: 1px;
            }
        }
    }
</style>


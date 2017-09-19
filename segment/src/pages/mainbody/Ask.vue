<template>
<!-- 提问 -->
    <div class="ask">
        <input type="text" class="title" placeholder="标题: 一句话说明问题">
        <input type="text" class="tag" placeholder="标签">
        <div class="rich-text-wrapper">
            <quill-editor v-model="content" 
                ref="myQuillEditor"
                placeholder="表述你的问题"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
            </quill-editor>
        </div>
    </div>
</template>

<script>
    import Quill from 'quill'
    import { quillEditor } from 'vue-quill-editor'

    export default  {
        components: {
            quillEditor
        },

        data(){
            return {
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
                        
                    }
                }
            }
        },

        methods:{
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
            border:1px solid #3b99fc; 
            box-shadow:0 0 3px 0 #3b99fc
        }

        // 内容
        .rich-text-wrapper{
            text-align: left;
            
            // 内容区
            .quill-editor {
                height: 500px;
            }
        }
    }
</style>


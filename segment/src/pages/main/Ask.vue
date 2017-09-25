<template>
<!-- 提问 -->
<div class="content" @click='showChoseTags = false'>
    <div class="ask" >
        <input type="text" class="title" placeholder="标题: 一句话说明问题" v-model.trim="title">
        <div class="tag-wrapper" @click.stop="showChoseTags = true">
            <input type="text" class="tag" placeholder="标签" @focus="showChoseTags = true">
            <ul class="chosen-tags">
                <li class="tag-item" v-for="(tag,index) in tags" :key="index">{{tag}}<span class="close pointer" @click="delTag(tag,index)">×</span></li>
            </ul>
            <div class="tag-select-wrapper" v-show="showChoseTags">
                <ul class="tag-classify">
                    <li class="classify-item pointer" v-for="(item,index) in tagClassification" :class="{ active: index==classifyActive }" :key="index" @click.stop="choseClassify(item,index)">{{item.classify}}</li>
                </ul>
                <ul class="tag-list">
                    <li class="list-item pointer" v-for="(item,index) in tagList" :key="index" @click.stop="choseItem(item,index)">{{item.item}}</li>
                </ul>
            </div>
        </div>
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
                showChoseTags: false,
                classifyActive: 0,
               
                tagClassification: [
                    {id:1, classify:'开发语言'},
                    {id:2, classify:'平台框架'},
                    {id:4, classify:'其他'}
                ],
                tagList:[   // 默认 开发语言
                    { id:1,item:'JavaScript' },
                    { id:2,item:'php' },
                    { id:3,item:'css' },
                    { id:3,item:'html' },
                    { id:3,item:'java' },
                    { id:3,item:'python' },
                    { id:3,item:'c++' }
                 ],
                languageItems: [    // 开发语言
                    { id:1,item:'JavaScript' },
                    { id:2,item:'php' },
                    { id:3,item:'css' },
                    { id:3,item:'html' },
                    { id:3,item:'java' },
                    { id:3,item:'python' },
                    { id:3,item:'c++' }
                ],
                paltformItems:[     // 开发平台
                    { id:1, item: 'laravel' },
                    { id:2, item: 'vue' },
                    { id:3, item: 'express' },
                    { id:4, item: 'react' }
                ],
                others: [   // 其他
                    { id:1, item: 'html5' },
                    { id:2, item: 'mysql' },
                    { id:3, item: 'mongodb' },
                    { id:4, item: 'redis' }
                ], 
                title:'',
                tag:'',
                tags:[],
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

            // 选择标签分类
            choseClassify(item,index){
                this.classifyActive = index;
                switch(index){
                    case 0: 
                        this.tagList = this.languageItems
                        break;
                    case 1: 
                        this.tagList = this.paltformItems;
                        break;
                    case 2: 
                        this.tagList = this.others;
                        break;
                    default: 
                        break;            
                }
            },

            // 选择标签
            choseItem(item,index){
                if(this.tags.length !== 0){
                    for(let i = 0; i<this.tags.length;i++){
                        if(item.item == this.tags[i]){
                            return
                        }
                    }
                    this.tags.push(item.item);
                }else {
                    this.tags.push(item.item);
                }
                // 转化为字符串
                this.tag = this.tags.join(','); 
            },

            // 删除标签
            delTag(tag,index){
                let tags = this.tags
                for(let i=0;i<tags.length;i++){
                    if(tag == tags[i]){
                        tags.splice(i,1)
                        return
                    }
                }
            },

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
    .content {
        width:100%;
    }
    .ask {
        width: 1116px;
        margin:0 auto;

        // 标签包裹层
        .tag-wrapper {
            position: relative;

            // 已选标签
            .chosen-tags {
                position: absolute;
                top:3px;
                left:0;
                font-size: 12px;
                .tag-item {
                    display: inline-block;
                    padding: 5px 10px;
                    border-radius:2px;
                    background-color:#ebf5f3;
                    color:@green;
                    margin: 0 3px;

                    .close {
                        display: inline-block;
                        width:5px;
                        text-align: center;
                        padding-left: 5px;
                    }
                }
            }

            // 备选标签
            .tag-select-wrapper {
                position: absolute;
                left: 0;
                top:32px;
                width: 320px;
                height: 160px;
                padding:15px;
                border:1px solid #ddd;
                background-color: #fff;
                z-index: 2;
                box-shadow: 0 0 20px rgba(100,100,100,0.3);
                font-size: 12px;
                text-align: left;
                

                // 标签分类
                .tag-classify {
                    .classify-item {
                        display: inline-block;
                        margin: 5px;
                        padding: 5px 10px;
                        border-radius:3px;
                        color:#666;

                        &:hover {
                            background-color: #eee;
                        }
                        &.active {
                            color:#fff;
                            background-color:@green;
                        }
                    }
                }

                // 标签列表
                .tag-list {
                    margin-top: 10px;
                    .list-item {
                        display: inline-block;
                        margin: 5px;
                        padding: 5px 10px;
                        border-radius:1px;
                        background-color: #ebf5f3;
                        color:@green;
    
                        &:hover {
                            background-color: @green;
                            color: #fff;
                        }
                    }
                }
            }
        }

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


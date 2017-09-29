<template>
    <div class="question">
       <ul class="nav-header">
           <li class="header-item" :class="{active:activeNav == index}" v-for='(item,index) in headerItems' :key='index'>{{item.item}}</li>
       </ul>
       <!-- 问题列表 -->
       <ul class="question-list">
           <li class="question-item" v-for="(question,index) in questionList" :key='index'>
               <div class="votes">
                   <span class="num">{{question.votes}}</span>
                   <br>
                   <span class="desc">得票</span>
               </div>
               <div class="answer">
                   <span class="num">{{question.answer}}</span>
                   <br>
                   <span class="desc">回答</span>
               </div>
               <div class="view">
                   <span class="num">{{question.views}}</span>
                   <br>
                   <span class="desc">浏览</span>
               </div>
               <!-- 问题 -->
               <div class="question-wrapper">
                   <div class="respondents">
                       <a href="javascript:;">{{question.lastRespondents | formatResp}}</a>
                       <a href="javascript:;">{{question.time}}</a>
                   </div>
                   <div class="question-title">
                       <span class="title">
                           <a href="javascript:;" @click='goDetail(question.q_id)'>{{question.questionTitle}}</a>
                            <ul class="type" >
                                <li class="type-item pointer" v-for=" (type,index) in question.tagName " :key="index">{{type}}</li>
                            </ul>
                       </span>
                   </div>
               </div>
           </li>
       </ul>
       <!-- 页码 -->
       <ul class="page">
           <li class="page-item pre-page"><input type="button" value="上一页" v-show='currentPage > 1' @click="prePage"></li>
           <li class="page-item more-page-l"><input type="button" value="..." v-show='currentPage > 3 ' disabled></li>
           <li class="page-item" :class="{active:currentPage == item, br:currentPage == 1, bl: currentPage== lastPage }" v-for="(item,index) in pages" :key="item" v-show="(item < currentPage+4) && (item > currentPage-3)"><input type="button" :value="item" @click="getCurrentPage(item)"></li>
           <li class="page-item more-page-r"><input type="button" value="..." v-show='lastPage > 5 && (currentPage < lastPage)' disabled></li>
           <li class="page-item next-page"><input type="button" value="下一页" v-show='currentPage < lastPage' @click="nextPage"></li>
       </ul>
    </div>
</template>

<script>
import { QUESTION_LIST } from '@/api/api'

export default {
    data(){
        return {
            activeNav: 0, //导航激活状态
            headerItems:[
                { item:'最新问答', type:'1'},
                { item:'热门问答', type:'1'},
                { item:'等待回答', type:'1'},
                { item:'最新动态', type:'2'},
                { item:'付费问答', type:'3'},
            ],
            questionList:[], //最新问答列表
            currentPage: 1,    // 当前页
            pageSize: 3,
            total: 0,
            pages:[],
            lastPage: 0, // 尾页
            midPage: 0, // 中间页
        }
    },
    filters:{
        formateType(val){
            let type = ''
            switch(val){
                case 1:
                type = 'javascript'
                break
                case 2:
                type = 'php'
                break;
                deafault:
                break
            }
            return type
        },
        formatResp(val){
            let res;
            if(val == undefined){
                res =  '暂无回答'
            }else {
                res = val
            }
            return res;
            
        }
    },
    methods:{
        // 获取问题列表
        getQueList(){
            let para = {
                page: this.currentPage,
                pageSize: this.pageSize
            }
            this.pages = []
            QUESTION_LIST(para).then(res=>{
                this.questionList = res.data.data
                let total = res.data.total
                this.total = total
                let pageNum = Math.ceil(total/this.pageSize)
                this.lastPage = pageNum
                this.midPage = Math.floor(pageNum/2)
                
                if(total>0){
                    for(let i=1;i<=pageNum;i++){
                        this.pages.push(i)
                    }
                }
                console.log(this.currentPage);
            })
        },
        
        // 当前页
        getCurrentPage(val){
            this.currentPage = val
            this.getQueList()
        },

        // 上一页
        prePage(){
            if(this.currentPage>1){
                this.currentPage--
                this.getQueList()
            }
        },

        // 下一页
        nextPage(){
            if(this.currentPage<this.lastPage){
                this.currentPage++
                this.getQueList()
            }
        },


        // 跳转问题详情页
        goDetail(val){
            let path = `/q/${val}`
            this.$router.push({path})
        }
    },
    mounted(){
        this.getQueList()
    }
}
</script>

<style lang="less" scoped>
    @import url('../../assets/css/mixin.less');
    // 重置按钮样式
    input[type='button'] {
        border:none;
        outline: none;
        background-color: #fff;
        margin:0;
        padding:0;
        cursor: pointer;
    }

    .question {
        width: 1116px;
        margin:29px auto 0;
        font-size: 14px;


        // 导航
        .nav-header {
            border-bottom: 1px solid #ddd;
            width:828px;
            height: 41px;
            text-align: left;
            color: @green;
            font-size: 14px;

            .header-item {
                display: inline-block;
                width: 88px;
                height: 42px;
                line-height: 42px;
                box-sizing: border-box;
                border-radius: 3px 3px 0 0;
                text-align: center;
                cursor: pointer;

                &:hover {
                    background-color: #ddd;
                    border-radius: 3px;    
                }

                &.active {
                    border:1px solid #efefef;
                    border-bottom-color: #fff;
                    color: @gray-l;
                    &:hover {
                        background-color:#fff;
                    }
                }
            }
        }

        // 问答列表
        .question-list {
            width:828px;
            text-align: left;

            .question-item {
                border-bottom:1px solid #ddd;
                padding-bottom: 11px;
                padding-top: 8px;
                vertical-align: top;
                color: @gray-l;

                // 得票 /浏览
                .votes,
                .view {
                    display: inline-block;
                    width: 40px;
                    height: 48px;
                    text-align: center;
                    margin-right: 10px;
                }

                // 回答
                .answer {
                    display: inline-block;
                    width:46px;
                    height: 40px;
                    border-radius: 3px;
                    background-color: @green;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    box-sizing: border-box;
                    padding-top:5px;
                    line-height: 1.2;
                    margin-right: 10px;

                }

                // 问题
                .question-wrapper {
                    vertical-align: top;
                    position: relative;
                    display: inline-block;
                    width:658px;
                    height: 45px;
                    // 答题者
                    .respondents {
                        position: absolute;
                        top:0;
                        a {
                            font-size: 12px;
                            color: @gray-l;
                            margin-right: 5px;
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }

                    // 问题标题
                    .question-title {
                        margin-top: 22px;
                        .title {
                            
                            line-height: 1;
                            a {
                                color:#333;
                                font-size: 18px;
                                &:hover {
                                    color:@green;
                                    text-decoration: underline;
                                }
                            }
                            
                        }
                        // 问题类型
                        .type {
                            display: inline-block;
                            font-size: 12px;
                            .type-item {
                                display: inline-block;
                                margin:0 3px;
                                padding: 2px 5px;
                                background-color: #ebf5f3;
                                color: @green;

                                &:hover {
                                    background-color: @green;
                                    color:#fff;
                                }
                            }
                        }
                    }
                }
            }
        }

        // 页码
        .page {
          text-align: center;
          font-size: 0;
          margin: 20px 0;

            // 页码
            .page-item {
                display: inline-block;
                font-size: 12px;

                input {
                    display: inline-block;
                    width:40px;
                    height: 32px;
                    line-height: 32px;
                    border: 1px solid #ddd;
                    color: @green;
                    border-left: none;
                }

                &.active input {
                    background-color: @green;
                    color:#fff;
                    border-color: @green;
                }
            }

            // 上一页/下一页
            .pre-page,
            .next-page{
                input {
                    width:65px;
                    height: 32px;
                    line-height: 32px;
                    border:1px solid #ddd;

                }
            }
            
            // 上一页
            .pre-page input{
                border-radius: 3px 0 0 3px;
            }
            // 下一页
            .next-page input{
                border-radius: 0 3px 3px 0;
            }
            
            // 省略页码(左/右)
            .more-page-l input,
            .more-page-r input{
                cursor: not-allowed;
             
            }
            .more-page-r input {
                border-right: none;
            }

            // 首页圆角
            .br input {
                border-radius: 3px 0 0 3px;
            }

            // 尾页圆角
            .bl input {
                border-radius: 0 3px 3px 0;
            }
        }
    }
</style>


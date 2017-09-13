<template>
    <div class="question">
       <ul class="nav-header">
           <li class="header-item" v-for='(item,index) in headerItems' :key='index'>{{item.item}}</li>
       </ul>
       <ul class="question-list">
           <li v-for="(question,index) in questionList" :key='index'>
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
               <div class="question">
                   <div class="respondents">
                       <span>{{question.respondents}} </span>
                       <span> {{question.time}}</span>
                   </div>
                   <div class="question-title">
                       <span>{{question.questionTitle}}</span>
                       <ul class="type" >
                           <li class="type-item" v-for=" (type,index) in question.types " :key="index">{{type | formateType}}</li>
                       </ul>
                   </div>
               </div>
           </li>
       </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            headerItems:[
                { item:'最新问答', type:'1'},
                { item:'热门问答', type:'1'},
                { item:'等待回答', type:'1'},
                { item:'最新动态', type:'2'},
                { item:'付费问答', type:'3'},
            ],
            questionList:[  //最新问答列表
                {
                    votes: 1,
                    answer: 2,
                    views: 3,
                    respondents:'lucy',
                    time:'2小时前',
                    questionTitle: 'vue 使用指南',
                    types: [1,2]
                }
            ]
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
        }
    }
}
</script>


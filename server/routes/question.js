var express = require('express');
var router = express.Router();
var QuestionModel = require('../models/QuestionModel');
var checkSession = require('../session/CheckSession'); 

// 提问
router.post('/ask_question',(req,res)=>{
    QuestionModel.askQuestion(req,res);
});

// 获取问题列表
router.get('/question_list',(req,res)=>{
    QuestionModel.questionList(req,res);
});

// 问题详情
router.get('/question_detail',(req,res)=>{
    QuestionModel.questionDetail(req,res);
});

module.exports = router;
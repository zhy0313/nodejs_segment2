var express = require('express');
var router = express.Router();
var QuestionModel = require('../models/QuestionModel');
var checkSession = require('../session/CheckSession'); 

router.post('/ask_question',(req,res)=>{
    QuestionModel.askQuestion(req,res);
});

module.exports = router;
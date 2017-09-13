var express = require('express');
var router = express.Router();
var UsersModel = require('../models/UsersModel');
var checkSession = require('../session/CheckSession'); 

// 注册
router.post('/register',(req,res)=>{
    UsersModel.register(req,res);
});

// 登录
router.post('/login',(req,res)=>{
    UsersModel.login(req,res);
});

// 退出登录
router.get('/logout',(req,res)=>{
    //注销session
    req.session.destroy(()=>{
        let data = {
            code:200,
            msg:'sucess'
        };
        res.send(data);
    });
});

// 查询用户列表
router.get('/getlist', function (req, res) {
    //验证session
    /* let result = checkSession.check(req, res);
    if (result.code == 402) {
        res.send(result);
        console.log(result);
        return;
    } */
    UsersModel.getUserList(req,res);
});
module.exports = router;

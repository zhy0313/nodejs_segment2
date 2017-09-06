var mysql = require('mysql');
var config = require('../db/config');

var pool = mysql.createPool(config.mysql);

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

module.exports = {
    // 注册
    register(req,res){

        console.log('body',req.body);
        let addUserSql = 'insert into user (username,email,mobile,pwd) values(?,?,?,?)';
        
        let body = req.body;
        let email = body.email == '' ? null : body.email;
        let mobile = body.mobile == '' ? null : body.mobile;
        let params = [body.name,email,mobile,body.pwd];

        pool.getConnection((err,conn)=>{
            let data = {
                code: 200,
                data: ''
            };
            if(err) {
                console.log(`连接错误:${err}`);
                data.code = 400;
                data.data = '连接错误,请稍后再试';
                res.send(data);
                return;
            }

            conn.query(addUserSql,params,(err,rs)=>{
                if(err){
                    console.log(`写入异常:${err}`);
                    data.code = 400;
                    let msg = err.message;
                    if(msg.indexOf('email_unique') > -1){
                        data.data = '邮箱已被注册';
                        data.errType = 'email';
                    }else if(msg.indexOf('username_unique') > -1){
                        data.data = '用户名已被注册';
                        data.errType = 'name';
                    }else if(msg.indexOf('mobile_unique')){
                        data.data = '手机已被注册';
                        data.errType = 'mobile';
                    } else {
                        data.data = msg;
                    }
                    res.send(data);
                    return;
                }

                data.data = '注册成功';
                res.send(data);
            });
            conn.release();
        });
    },

    // 登录
    login(req,res){
        // let loginSql = 'select uid,username from where '
    },

    // 用户列表
    getUserList(req,res){
        let getUserSql = ' select * from user';
        let params = [];

        pool.getConnection((err,conn)=>{
            if(err) throw err;

            conn.query(getUserSql,params,(err,rs)=>{
                if(err) throw err;

                let arr = [];
                if(rs.length){
                    rs.forEach((e)=>{
                        let obj = {
                            username: e.username,
                            email: e.email
                        };
                        arr.push(obj);
                    });

                    let data = {
                        code:200,
                        data:arr
                    };
                    res.send(data);
                    return;
                }
                res.send('无用户');
            });
            conn.release();
        });
    }
};
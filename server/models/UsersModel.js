var mysql = require('mysql');
var config = require('../db/config');

var pool = mysql.createPool(config.mysql);
pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

module.exports = {
    // 注册
    register(req,res){
        let addUserSql = 'insert into user (username,email,mobile,pwd) values(?,?,?,?)';
        
        let body = req.body;
        let email = body.email == '' ? null : body.email;       // 为空则存储null
        let mobile = body.mobile == '' ? null : body.mobile;    // 为空则存储null
        let params = [body.name,email,mobile,body.pwd];

        pool.getConnection((err,conn)=>{
            let data = {
                code: 200,
                msg: ''
            };
            if(err) {
                console.log(`连接错误:${err}`);
                data.code = 400;
                data.msg = '连接错误,请稍后再试';
                res.send(data);
                return;
            }

            conn.query(addUserSql,params,(err,rs)=>{
                if(err){
                    console.log(`写入异常:${err}`);
                    data.code = 400;
                    let msg = err.message;
                    if(msg.indexOf('email_unique') > -1){
                        data.msg = '邮箱已被注册';
                        data.errType = 'email';
                    }else if(msg.indexOf('username_unique') > -1){
                        data.msg = '用户名已被注册';
                        data.errType = 'name';
                    }else if(msg.indexOf('mobile_unique')){
                        data.msg = '手机已被注册';
                        data.errType = 'mobile';
                    } else {
                        data.msg = msg;
                    }
                    res.send(data);
                    return;
                }
                req.session.sessionID = body.name;
                data.msg = 'success';
                res.send(data);
            });
            conn.release();
        });
    },

    // 登录
    login(req,res){
        // console.log('session::',req.session);
        // TODO
        // setToken

        let loginSql = 'select uid,username from user where (email=? or mobile=?) and pwd=?';
        let body = req.body;
        let params = [body.user,body.user,body.pwd];
        
        pool.getConnection((err,conn)=>{
            let data = {
                code: 200,
                msg:'success'
            };

            if(err){
                console.log(err);
                data.code = 401;
                data.msg = err.message;
                res.send(data);
                return;
            }

            conn.query(loginSql,params,(err,rs)=>{
                if(err){
                    console.log(`错误2:${err.message}`);
                    data.code = 401,
                    data.msg = err.message,
                    res.send(data);
                    return;
                }

                // 查询结果结果
                if(rs.length > 0 ){
                    data.data = rs[0];

                    // 设置session
                    let sessionID =  rs[0].username;
                    req.session.sessionID = sessionID;

                }else {
                    data.code = 400;
                    data.msg = '用户名或密码错误';
                }
                res.send(data);
            });
            conn.release();
        });
    },

    // 查询用户列表
    getUserList(req,res){

    // =========测试debugger====================== 
        let a = 1;
        console.log(a);
        let b = 2;
        console.log(b);
        let c = [1,2,3];
        console.log(c);
        let d = function(){
            return {
                node: 'debugger'
            }
        };
        console.log(d);
        let e = 5;
        console.log(e);
        
    //==============测试debugger=====================    

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
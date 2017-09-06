var mysql = require('mysql');
var config = require('../db/config');

var pool = mysql.createPool(config.mysql);

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

module.exports = {
    // 注册
    register: function(req,res){

        let addUserSql = 'insert into user (username,email,pwd) values(?,?,?)';
        

        let params = ['b1','b1@qq.com','123'];

        console.log(req);

        pool.getConnection((err,conn)=>{
            if(err) {
                console.log(`连接错误:${err}`);
                res.send(err);
                return;
            }

            conn.query(addUserSql,params,(err,rs)=>{
                if(err){
                    console.log(`写入异常:${err}`);
                    return;
                }
                console.log(rs);
                let data = {
                    code: 200,
                    data: rs
                };
                res.send(data);
            });
            conn.release();
        });
    },

    // 登录
    login(req,res){

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
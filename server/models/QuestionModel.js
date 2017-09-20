var mysql = require('mysql');
var config = require('../db/config');

var pool = mysql.createPool(config.mysql);
pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

module.exports = {
    // 提问
    askQuestion(req,res){
        let data = {
            code:200,
            msg:'success'
        };

        let body = req.body;
        let title = body.title == '' ? null : body.title;
        let tag = body.tag == '' ? null : body.tag;
        let content = body.content == '' ? null : body.content;

        let askSql = 'insert questions values(null,?,?,?)';
        
        let param = [title,tag,content];

      
        pool.getConnection((err,conn)=>{
            if(err){
                data.code = 401;
                data.msg = '连接错误';
                res.send(data);
                return;
            }


            conn.query(askSql,param,(err,rs)=>{
                if(err){
                    data.code = 400;
                    data.msg = err.message;
                    res.send(data);
                    return;
                }
                res.send(data);
            });
            conn.release();
        });

    }
};
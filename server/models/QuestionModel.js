var mysql = require('mysql');
var config = require('../db/config');

var pool = mysql.createPool(config.mysql);
pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

module.exports = {
    /**
     * 提问
     * title 标题
     * tag 标签
     * content 内容
     */
    askQuestion(req,res){
        let data = {
            code:200,
            msg:'success'
        };

        let body = req.body;
        let title = body.title;
        let tag = body.tag;
        let content = body.content;
        let user_id = req.session.sessionID;
        // 验证
        if(title == '' || tag == '' || content==''){
            data.code = 400;
            data.msg = '请填写完整问题信息';
            res.send(data);
            return;
        }
        
        let askSql = 'insert questions(q_id,q_title,q_tag,q_content,user_id) values(null,?,?,?,?)';
        let param = [title,tag,content,user_id];
      
        pool.getConnection((err,conn)=>{
            if(err){
                data.code = 401;
                data.msg = '连接错误';
                res.send(data);
                return;
            }

            conn.query(askSql,param,(err)=>{
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
    },

    /**
     * 获取问题列表
     */
    questionList(req,res){
        let data = {
            code:200,
            msg: 'success'
        };

        let queSql = 'SELECT q_id,q_title questionTitle,q_tag tagName,votes,answer,views,u.username AS lastRespondent FROM questions AS q INNER JOIN user AS u ON q.user_id = u.uid ORDER BY q.create_time DESC';

        pool.getConnection((err,conn)=>{
            if(err){
                data.code = 401;
                data.msg = '连接错误,请稍候重试';
                res.send(data);
                return;
            }
            conn.query(queSql,[],(err,rs)=>{
                if(err){
                    data.code = 400;
                    data.msg = err.message;
                    res.send(data);
                    return;
                }
                // 转换tagName
                rs.forEach((e)=>{
                    e.tagName = e.tagName.split(',');
                });
                data.data = rs;
                res.send(data);
            });
            conn.release();
        });
    },

    /**
     * 获取问题详情
     */
    questionDetail(req,res){
        let data = {
            code:200,
            message: 'sucess',
            data:''
        };
        
        let queSql = 'select q.q_title as title, q.q_content as content,u.username, q.q_tag as tags, q.create_time, q.last_res_time,q.last_res_id from questions as q inner join user as u on q.user_id = u.uid where q_id=?';
        let param = req.query.q_id;
        pool.getConnection((err,conn)=>{
            if(err){
                data.code = 401;
                data.msg = '连接错误';
                res.send(data);
                return;
            }
            conn.query(queSql,param,(err,rs)=>{
                if(err){
                    data.code = 400;
                    data.msg = err.message;
                    res.send(data);
                    return;
                }
                
                let result = rs[0];
                result.content = result.content.toString(); 
                data.data = result;
                res.send(data);
            });
            conn.release();
        });
    }

};
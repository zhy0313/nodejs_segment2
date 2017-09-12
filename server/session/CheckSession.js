module.exports = {
    check(req,res){
        let id = req.session.sessionID;
        let data = {
            code: 200,
            msg: 'success'
        };
        if(!id){
            data.code = 402,
            data.msg = '登录过期,请重新登录';
        }
        return data;
    }
};
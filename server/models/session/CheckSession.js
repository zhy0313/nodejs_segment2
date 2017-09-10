module.exports = {
    checkSession(req,res){
        let id = req.session.sessionID;
        if(!id){
            let data = {
                code: 402,
                msg: '登录过期,请重新登录'
            };
            res.send(data);
        }
    }
};
const config = require("../config");
const jsonWebToken = require("../db/model/jwt");

let utils = {
    log : function (msg) {
        if(!config.debug){return false}
        console.log(msg);
    },
    sendRes : function (res,err,msg,data) {
        let obj = {
            err : err,
            msg : msg,
            data : data || null
        };
        res.send(obj);
    },
    verify : function (req,res,next) {
        // 下面的代码是 验证token合法性 以及token是否超过有效期
        let {token} = req.body;
        // 验证token是否存在
        if(!token){
            return res.send({err:"-998",msg:"token 缺失"});
        }
        // 验证token合法性
        jsonWebToken.checkToken(token)
            .then((data)=>{
                // 时间验证
                console.log(Date.now());
                if(Date.now() - data.ctime >= config.loginTime){
                    res.send({err : "-997",msg:"token 请求超时 请重新登录"});
                }else{
                    next();
                }
            })
            .catch((err)=>{
                res.send({err:"-999",msg:"token非法"})
            })
    }

};

module.exports = utils;
const jwt = require("jsonwebtoken");
const scrict = "sadsgfjhsgfhsgfshfjhzgfhj";

function createToken(payload) {
    // 产生token
    payload.ctime = Date.now();
    return jwt.sign(payload,scrict);
}

function checkToken(token) {
    return new Promise((resolve,reject)=>{
        jwt.verify(token,scrict,(err,data)=>{
            if(err){reject("token 验证失败")}
            resolve(data);
        })
    })
}

module.exports = {
    createToken,
    checkToken
};

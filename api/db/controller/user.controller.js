const utils = require("../../util/util");
const userModel = require("../model/userModel");

// 添加用户信息
let addUser = (req,res)=>{
    let {name,pass} = req.body;
    userModel.insertMany({name,pass})
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"add ok",null);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null);
        });
    console.log(name,pass);
};

// 删除用户信息
let delUser = (req,res)=>{
    let _id = req.body._id;
    userModel.remove({_id : _id})
        .then((data) =>{
            console.log(data);
            utils.sendRes(res,0,"删除成功",null);
        })
        .catch((err)=>{
           utils.log(err);
           utils.sendRes(res,-1,err._message,null);
        });
};

// 修改用户信息
let updateUser = (req,res)=>{
    let _id = req.body._id;
    let {name,pass} = req.body;
    userModel.updateOne({_id : _id},{name,pass})
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"update ok",null)
        })
        .catch((err)=>{
            console.log(err);
            utils.sendRes(res,-1,err._message,null)
        })
};

//查询所有用户信息
let getUser = (req,res)=>{
    userModel.find()
        .then((data)=>{
          console.log(data);
          utils.sendRes(res,0,"select ok",data);
        })
        .catch((err)=>{
          utils.log(err);
          utils.sendRes(res,-1,err._message,null)
        });
};

let getUserById = (req,res)=>{
    let {_id} = req.body;
    userModel.find({_id})
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"select ok",data);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null)
        });

};

let getUserByKw = (req,res)=>{
    let {keyword} = req.body;
    let reg = new RegExp(keyword);
    userModel.find({name:{$regex : reg}})
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"select ok",data);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null)
        });
};

let getUserByPage = (req,res)=>{
    let page = req.body.page || 1;
    let pageSize = req.body.pageSize || 2;
    let result = {count:0,lists:[]};
    userModel.find()
        .then((data)=>{
            result.count = data.length;// 获取总的数据条数
            return userModel.find().skip(Number(( page - 1 ) )* ( pageSize )).limit(Number(pageSize));
        })
        .then((data)=>{
            console.log(data);
            result.lists = data;
            utils.sendRes(res,0,"select ok",result);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null);
        })
};


module.exports = {
    addUser,        // 添加用户信息
    delUser,        // 删除用户信息
    updateUser,     // 修改用户信息
    getUser,        // 查询所有用户信息
    getUserById,    //根据用户id查询一条用户信息
    getUserByKw,    //关键字查询
    getUserByPage   // 根据页码数查询数据信息
};
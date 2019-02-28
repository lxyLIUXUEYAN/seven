const utils = require("../../util/util");
const tableModel = require("../model/tableModel");// 数据模型

//查询功能
// 整体查询
let getTable = (req,res)=>{
    tableModel.find()
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"select ok",data);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null);
        });
};

//根据id查询
let getTableById = (req,res)=>{
    let {_id} = req.body;
    tableModel.find({_id})
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"select ok",data);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null);
        });
};

// 分类查询
let getTableByType = (req,res)=>{
    console.log(req.body);
    let types = req.body;
    tableModel.find({types})
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"select ok",data);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null)
        });
};

//根据页码数查询数据
let getTableByPage = (req,res)=>{
    let page = req.body.page || 1;
    let pageSize = req.body.pageSize || 2;
    let result = { count : 0, lists : []};
    tableModel.find()
        .then((data)=>{
            result.count = data.length;
            return tableModel.find().skip(Number((page - 1) * pageSize)).limit(Number(pageSize));
        })
        .then((data)=>{
            console.log(data);
            result.lists = data;
            utils.sendRes(res,0,"select ok",result);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,0,"select ok",null);
        })
};

// 修改
let updateTable = (req,res)=>{
    let _id = req.body._id;
    let {type,price,imgPath,desc,num} = req.body;
    tableModel.updateOne({_id:_id},{type,price,imgPath,desc,num})
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"update ok",null);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null)
        });
};

//删除
let delTable = (req,res)=>{
    let _id = req.body._id;
    tableModel.remove({_id:_id})
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"delete ok",null);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null);
        });
};

// 添加
let addTable = (req,res)=>{
    let {type,price,imgPath,desc,num} = req.body;
    tableModel.insertMany({type,price,imgPath,desc,num})
        .then((data)=>{
            console.log(data);
            utils.sendRes(res,0,"add ok",null);
        })
        .catch((err)=>{
            utils.log(err);
            utils.sendRes(res,-1,err._message,null);
        });
};

module.exports = {
    getTable,       //整体查询
    getTableById,   // 根据id查询
    getTableByType, //按类别查询
    getTableByPage, // 按页码数查询
    updateTable,    //修改
    delTable,       //删除
    addTable        //添加
};

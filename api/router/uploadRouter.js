const express = require("express");
const router = express.Router();
const utils = require("../util/util");
const multer = require("multer");
const fs = require("fs");
const Path = require("path");
const upload = multer({dest : "uploads/"}); // 指定上传的缓存目录

router.post("/img",upload.single("pic"),(req,res)=>{
    //single  文件上传的数据 key
    console.log(req.file);
    let {path,mimetype} = req.file;
    // 只允许后缀名为 png  jpg  jpeg  gif格式上传
    let ext = mimetype.split("/")[1]; // 获取后缀名
    if(["jpg","jpeg","png","gif"].indexOf(ext) === -1){
        return utils.sendRes(res,-1,"非法格式",null);
    }
    let name = (new Date()).getTime() + parseInt(Math.random() * 99999) +  parseInt(Math.random() * 10000);  // 名字必须不能重复
    // 文件大小（自己补充）


    fs.readFile(path,(err,data)=>{
       if(err){ return utils.sendRes(res,-2,"上传失败",null);}
       fs.writeFile(Path.join(__dirname,`../public/img/${name}.${ext}`),data,"binary",(err)=>{
           if(err){ return utils.sendRes(res,-2,"上传失败",null);}
           let url = `/public/img/${name}.${ext}`;
           return utils.sendRes(res,0,"上传成功",url);
       })
    });
});

module.exports = router;
/*
    文件上传操作：
        1. 前端
            · <input type="file"> 文件域  获取文件
            · 将获取的文件信息转化为formdata数据模式
            · 通过ajax进行上传 jquery
                    文件上传不需要缓存
                    文件上传的数据类型不需要jquery进行默认处理

        2. 后端
            · 获取前端上传的文件数据
                    通过第三方插件获取 multer
                    通过 req.file 进行获取
                        { fieldname: 'pic',    必须和upload.single("")的值相同
                          originalname: '29.png',  图片原来的名称
                          encoding: '7bit',        编码格式
                          mimetype: 'image/png',   图片类型
                          destination: 'uploads/',  保存到的临时路径
                          filename: 'f10fe50150fdc6f3781464e2fe883dce',  保存的名称
                          path: 'uploads\\f10fe50150fdc6f3781464e2fe883dce',    保存的路径
                          size: 4747 }  图片的大小  以B为单位
            · 将文件数据进行处理
            · 将文件数据写入本地
 */
// 入口文件
const express = require("express");
const app = express();
const path = require("path");
const con = require("./db/connect");
const utils = require("./util/util");

//基本插件
// post 请求相关插件
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

// 开启静态文件插件
app.use("/public",express.static(path.join(__dirname,"./public")));

//路由配置
const adminUser = require("./router/userRouter");
const adminTable = require("./router/tableRouter");
const adminUpload = require("./router/uploadRouter");

app.use("/admin/user",adminUser);
app.use("/admin/tables",adminTable);
app.use("/admin/upload",adminUpload);

app.post("/test",utils.verify,(req,res)=>{
   res.send("测试ok");
});



// 监听
app.listen(3000,()=>{
    console.log("server 服务器开启，port : 3000");
});
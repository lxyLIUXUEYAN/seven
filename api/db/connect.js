const mongoose = require("mongoose");
const config = require("../config");
mongoose.connect(config.db,{ useNewUrlParser: true });

let db = mongoose.connection;

db.on("error",(err)=>{
    console.log("连接错误");
});

db.on("open",()=>{
    console.log("连接成功");
});
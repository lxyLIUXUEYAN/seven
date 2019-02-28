const mongoose = require("mongoose");
//数据模型
let UserSchema = new mongoose.Schema({
    name : {type:String,require:true},
    pass:{type:String,require:true}
});

// 将Schema对象转化为数据模型
let model = mongoose.model("user",UserSchema);

module.exports = model;
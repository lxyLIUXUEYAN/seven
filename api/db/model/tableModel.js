const mongoose = require("mongoose");
// 数据模型
let TableSchema = new mongoose.Schema({
   type : { type : String, require : true },
   price : { type : String, require : true },
   imgPath : { type : String, require : true },
   desc : { type : String, require : true },
   num : { type : String, require : true }
});

// 将Schema对象转化为数据模型
let model = mongoose.model("tables",TableSchema);

module.exports = model;
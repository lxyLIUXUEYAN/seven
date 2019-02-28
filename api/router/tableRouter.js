const express = require("express");
const router = express.Router();
const tableController = require("../db/controller/table.controller");

/*
    添加餐桌
    查询餐桌  -->  分页 模糊查询  按类型查询
    删除餐桌  -->  单独删除  批量删除
    修改餐桌信息
 */

// 添加餐桌
router.post("/addTable",tableController.addTable);

// 查询餐桌
router.post("/getTable",tableController.getTable);

// 根据id查询
router.post("/getTableById",tableController.getTableById);


// 分类查询
router.post("/getTableByType",tableController.getTableByType);

// 根据页码数查询数据
router.post("/getTableByPage",tableController.getTableByPage);

// 修改餐桌信息
router.post("/updateTable",tableController.updateTable);

// 删除餐桌信息
router.post("/delTable",tableController.delTable);

module.exports = router;
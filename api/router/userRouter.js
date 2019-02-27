const express = require("express");
const router = express.Router();
const userController = require("../db/controller/user.controller");

// 添加用户信息
router.post("/addUser",userController.addUser);
// 删除用户信息
router.post("/delUser",userController.delUser);
// 修改用户信息
router.post("/updateUser",userController.updateUser);
// 查询所有用户信息
router.post("/getUser",userController.getUser);
// 根据id查询一条用户信息
router.post("/getUserById",userController.getUserById);
// 模糊查询 关键字查询
router.post("/getUserByKw",userController.getUserByKw);
// 根据页码数查询数据
router.post("/getUserByPage",userController.getUserByPage);

module.exports = router;
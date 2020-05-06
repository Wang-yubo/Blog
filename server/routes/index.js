var express = require('express');
var router = express.Router();

var article = require("../db/article")
var articleInfo = require("../db/articleInfo");

//* 文章相关接口
router.use("/article", require("./article/index"))

//* 注册相关接口
router.use("/register", require("./register/index"))

module.exports = router;
var express = require('express');
var router = express.Router();

var article = require("../db/article")
var articleInfo = require("../db/articleInfo");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("测试数据")
});

//* 文章相关接口
router.use("/article", require("./article/index"))

module.exports = router;
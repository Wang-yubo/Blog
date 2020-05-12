var express = require('express');
var router = express.Router();

var article = require("../db/article")
var articleInfo = require("../db/articleInfo");

/*文章相关的接口*/
router.use("/article", require('./article/index'));

/*注册相关的接口*/
router.use("/register", require('./register/index.js'));

/*登录接口*/
router.use("/login", require('./login/index'));

module.exports = router;
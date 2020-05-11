var express = require('express');
var article = require("../../db/article")
var articleInfo = require("../../db/articleInfo");
var router = express.Router();
//* 获取文章Info
router.post("/getInfo", (req, res) => {
    articleInfo.findOne({}, { _id: 0, __v: 0 })
        .then(data => {
            res.send({
                code: 0,
                msg: "请求成功",
                data,
            })
        })
        .catch(() => {
            res.send({
                code: 4,
                msg: "服务器错误",
                data: null
            })
        })
});
//* 获取热门文章8篇
router.post("/getHot", (req, res) => {
    let { limit } = req.body;
    article.find({}, { __v: 0 }, { sort: { pv: -1 }, skip: 0, limit })
        .then((data) => {
            res.send({
                code: 0,
                data,
            })
        })
        .catch(() => {
            res.send({
                code: 4,
                msg: "服务器错误",
                data: null
            })
        })
});

//* 主体文章列表的显示
router.post("/getShow", (req, res) => {
    let { skip, limit, tag } = req.body;
    let options = tag ? { tag } : {}
    article.find(options, { __v: 0 }, { skip, limit, sort: { pv: -1 } })
        .then(data => {
            res.send({
                code: 0,
                data,
            })
        })
        .catch(err => {
            res.send({
                code: 4,
                msg: "服务器错误"
            })
        })
})

module.exports = router;
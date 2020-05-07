const express = require("express");
var router = express.Router();
const svgCaptcha = require("svg-captcha")
    // svgCaptcha的用法,一般也就是使用svgCaptcha.create方法
    // let captcha = svgCaptcha.create()
    // console.log(captcha);
    // 该方法会返回两个值,{text:"",data:'<svg></svg>'}
    // 只需要把data返回给前端就可以了,text相当于答案,这个不能发

router.post("/vcode", (req, res) => {
    //* 设置验证码的刷新时间
    //* 如果已经有创建时间,证明这不是第一次加载验证码了,
    if (req.session.registerVCodeTime) {
        let t_ = new Date - new Date(req.session.registerVCodeTime)
            //* 判断现在的时间与上一次创建的时间是否间隔1分钟
        if (t_ < 60000) {
            res.send({
                code: 2,
                meg: "请求过于频繁",
                time: 60000 - t_ //转换格式
            })
            return;
        }
    }


    //* 创建验证码
    let captcha = svgCaptcha.create();
    //* 将正确的答案保存在session中
    req.session.registerVCode = captcha.text;
    //* 创建第一次得到验证码的时间
    req.session.registerVCodeTime = new Date();
    //* 将svg发送给前端
    res.send({
        code: 0,
        data: captcha.data,
        time: 600000
    })
})
module.exports = router;
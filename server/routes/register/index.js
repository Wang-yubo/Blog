const express = require("express");
const router = express.Router;
const svgCaptcha = require("svg-captcha")
    // svgCaptcha的用法,一般也就是使用svgCaptcha.create方法
    // let captcha = svgCaptcha.create()
    // console.log(captcha);
    // 该方法会返回两个值,{text:"",data:'<svg></svg>'}
    // 只需要把data返回给前端就可以了,text相当于答案,这个不能发

router.post("/vcode", (req, res) => {
    let captcha = svgCaptcha.create();
    res.send({
        code: 0,
        data: captcha.data
    })
})
module.exports = router;
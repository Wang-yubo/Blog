const express = require("express");
var router = express.Router();
const svgCaptcha = require("svg-captcha")

const userDB = require("../../db/user")

/*
 * svgCaptcha的用法,一般也就是使用svgCaptcha.create方法
 * let captcha = svgCaptcha.create()
 * console.log(captcha);
 * 该方法会返回两个值,{text:"",data:'<svg></svg>'}
 * 只需要把data返回给前端就可以了,text相当于答案,这个不能发
 */


//注册的API
router.post("/", (req, res) => {
    let { user, pwd, svgCode } = req.body;

    //干掉req.session.registerVCodeTime
    req.session.registerVCodeTime = 0;
    //验证数据有效性
    if (!user || !pwd || !svgCode) {
        res.send({
            code: 1,
            msg: "数据无效，请检查后再注册。"
        });
        return;
    }

    //后端再次验证验证码
    if (svgCode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase()) {
        res.send({
            code: 2,
            msg: "验证码错误"
        });
        return;
    }

    //验证用户与密码
    if (!/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(user) || !/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(pwd)) {
        res.send({
            code: 2,
            msg: "用户名或密码不符合规则"
        });
        return;
    }

    //检测用户名是否重复
    userDB.findOne({ user })
        .then(data => {
            /*
             * data如果有值(是一个对象)，说明user重复
             * data如果没有值（是null），说明user不重复
             */
            if (data) {
                res.send({
                    code: 3,
                    msg: "用户名已存在"
                });
            } else {
                //用户名不存在，接着存数据到数据库
                userDB.create({ user, pwd })
                    .then(() => {
                        //走到这里说明注册成功
                        res.send({
                            code: 0,
                            msg: "注册成功"
                        });
                    })
                    .catch(() => {
                        res.send({
                            code: 4,
                            msg: "服务器错误"
                        });
                    });
            }
        })
        .catch(e => {
            res.send({
                code: 4,
                msg: "服务器错误"
            });
        });

});


router.post("/vcode", (req, res) => {
    //* 设置验证码的刷新时间
    //* 如果已经有创建时间,证明这不是第一次加载验证码了,
    if (req.session.registerVCodeTime) {
        let t_ = new Date - new Date(req.session.registerVCodeTime)
            //* 判断现在的时间与上一次创建的时间是否间隔1分钟
        if (t_ <= 6000) {
            res.send({
                code: 2,
                meg: "请求过于频繁",
                time: 6000 - t_ //转换格式
            })
            return;
        }
    }


    //* 创建验证码
    let captcha = svgCaptcha.create();
    //* 将正确的答案保存在session中
    req.session.registerVCode = captcha;
    //* 创建第一次得到验证码的时间
    req.session.registerVCodeTime = new Date();
    //* 将svg发送给前端
    res.send({
        code: 0,
        data: captcha.data,
        time: 6000
    })
})

//验证码失去焦点的请求
router.post("/checkVcode", (req, res) => {
    let { svgCode } = req.body;

    if (!svgCode || (svgCode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase())) {
        res.send({
            code: 1,
            msg: "验证失败"
        });
    } else {
        res.send({
            code: 0,
            msg: "验证成功"
        });
    }
});
module.exports = router;
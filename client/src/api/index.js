import axios from "axios";

//配置默认的参数
axios.defaults.baseURL = 'http://localhost:3000'; //默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie,否则无法使用session
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式

export default {
    //* 获取文章信息
    getArticleInfo() {
        return axios.post("/article/getInfo")
    },
    //* 获取热门文章
    getArticleHot() {
        return axios.post("/article/getHot")
    },
    //* 获取文章列表
    getArticleShow: (function() { //写成闭包好拿到这个两个参数
        let skip = 0;
        let limit = 5;
        return function(index = 0, ifFresh = false) {
            if (ifFresh) {
                skip = 0;
                limit = 5;
            }
            let tag = ["", "HTML&Css", "JavaScript", "Node", "Vue&React", "Other"][index];
            let data = { skip, limit, tag };
            skip += limit;
            return axios.post("/article/getShow", data)
        }
    })(),
    //* 获取验证码图片
    getRegisterVCode() {
        return axios.post("/register/vcode");
    },
    //* 验证码的提交
    getRegisterCheckVcode(svgCode) {
        return axios.post('/register/checkVcode', { svgCode })
    },

};
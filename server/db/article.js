const mongoose = require("mongoose");
let Schema = mongoose.Schema;


let article = mongoose.model("article", new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tag: { type: String, required: true },
    date: { type: Date, default: Date.now },
    surface: { type: String, default: 'http://localhost:3000/img/defaultSurface.jpg' },
    pv: { type: Number, default: 0 },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "comment"
    }]
}));


//* 假数据测试一波
// for (var i = 0; i < 100; i++) {
//     article.create({
//         type: ["原创", "转载"][(Math.random() * 5 | 0)],
//         title: `第${i+1}篇文章`,
//         content: (`我是第${i+1}篇文章的内容,哈哈哈哈哈`).repeat(10),
//         tag: ["HTML&Css", "JavaScript", "Node", "Vue+React", "Other"][(Math.random() * 5 | 0)]
//     })
// }

module.exports = article;
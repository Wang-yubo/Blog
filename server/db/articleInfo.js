const mongoose = require("mongoose")
let Schema = mongoose.Schema;
let articleInfo = mongoose.model("articleInfo", new Schema({
    tags: [String],
    num: [Number]
}))

// articleInfo.create({
//     tags: ["HTML&Css", "JavaScript", "Vue", "react+node", "other"],
//     num: 100
// })
module.exports = articleInfo
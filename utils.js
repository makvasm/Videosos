const needle = require("needle");
const cheerio = require("cheerio");
const mongodb = require("mongodb")

async function ParseThread(url) {
    let doc = await needle("get", url)
        .then(res => {
            return res.body;
        });
    let $ = cheerio.load(doc);

    let response = [];
    $("img.post__file-webm").each((i, elem) => {
        let preview = "https://2ch.hk" + elem.attribs.src
        let video = "https://2ch.hk" + elem.parent.attribs.href
        response.push({
            video,
            preview
        })
    });
    return response;
}

module.exports = {
    ParseThread,
}
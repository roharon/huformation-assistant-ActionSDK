var cheerio = require('cheerio')
var request = require('request')
var charset = require('charset')
var iconv = require('iconv-lite')
var fs = require('fs')
var urlType = require('url')

var saveddir = __dirname + '/img'

if(!fs.existsSync(saveddir)) {
    fs.mkdirSync(saveddir)
}
    
var url = 'http://203.232.237.8/domian5/2/domian5.asp'

var li = []
request(url, (err, res, html) => {
    
    var $ = cheerio.load(html)

    $('tr > td > font').each((index, elem) => {
        //console.log(elem)
        var title_info = $(this);
        var title_info_text = title_info.text();
        
        li.push(li)
    })
})
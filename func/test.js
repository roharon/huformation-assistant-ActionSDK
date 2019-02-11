const cafe_crawl = require('./cafe_crawl')
const request = require('sync-request')
var temp = null

const url = 'http://myserver.aaronroh.org:5000/cafe/inmoon/today'

// test code
var response = request('GET', url)
var result = response.getBody('utf-8')
result = JSON.parse(result)
console.log(result)
console.log('\n\n', result['title'])
console.log(Object.keys(result['title']).length)
var a = ['a']

console.log(a*10)
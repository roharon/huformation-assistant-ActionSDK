const request = require('request')
const async = require('async')

var url = 'http://myserver.aaronroh.org:5000/cafe'
// 동기식 작업
module.exports = async (cafeteria, day) => {

    url += '/' + cafeteria + '/' + day
    var result = { response: null }


    var tasks = [
        function (callback) {
            request.get(url, (error, res, body)=> callback(error,res,body))
        },

        function (error, res, body) {
            result.response = res.body
        }
    ]

    async.waterfall(tasks, function(err) {
        if(err){
            console.log('err')
        }
        else {
            console.log('done')
        }
    });
    
    return await result.response
}
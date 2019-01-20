const {SimpleResponse} = require('actions-on-google');
// Not yet.

module.exports = (conv, {cafe_name}) => {
    conv.ask({cafe_name} + "입니다")
}
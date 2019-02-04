const {SimpleResponse} = require('actions-on-google');
// Not yet.

module.exports = (conv, {cafe_name}) => {
    conv.ask(conv.arguments.get('cafeteria') + ' 메뉴를 알려드릴게요')
}
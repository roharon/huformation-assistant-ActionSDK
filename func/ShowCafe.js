const {Table, SimpleResponse} = require('actions-on-google');

module.exports = (conv) => {
    conv.ask(conv.arguments.get('cafeteria') + ' 메뉴를 알려드릴게요')
}
const {SimpleResponse, Suggestions} = require('actions-on-google');
const caf = require('./var.js');

// Show button (SEOUL, GLOBAL)
// It will be deleted when DB set-up&connecting is done.

module.exports = (conv) => {

    const ssml = '<speak>' +
    "<p><s>안녕하세요 외대학식입니다.</s>"
    + "<s>원하시는 캠퍼스를 말씀해주세요.</s>"
    + "</p> </speak>";

    conv.ask(ssml)
    conv.ask(caf.CAMPUS)
    console.log('== intent_main ACTIVATED! ==')
}
const {Permission, SimpleResponse, Suggestions} = require('actions-on-google');
const caf = require('./var.js');

// Show button (SEOUL, GLOBAL)
// It will be deleted when DB set-up&connecting is done.

module.exports = (conv) => {
    var sugg;
    var ssml;
    const name = conv.user.storage.userName;

    if(name) {
        ssml = '<speak>' +
        "<p><s>안녕하세요." 
        + name + "님</s>"
        + "<s>원하시는 식당을 선택해주세요</s>"
        + "</p> </speak>";

        if(conv.user.storage.campus == 'seoul'){
            sugg = caf.SEOUL_CAFE
        }
        else if(conv.user.storage.campus == 'global'){
            sugg = caf.GLOBAL_CAFE
        }
        else{
            sugg = new Suggestions('처음으로')
        }   
    }
    else {
        ssml = '<speak> <p>' +
        + "<s>원하시는 캠퍼스를 말씀해주세요.</s>"
        + "</p> </speak>";

        sugg = caf.CAMPUS

        conv.ask(new Permission({
            context: '이름의 권한이 필요합니다',
            permissions: 'NAME',
          }));
    }
    
    // 캠퍼스 분류 후, 수정예정

    conv.ask(ssml)
    conv.ask(sugg)
    console.log('== intent_main ACTIVATED! ==')
}
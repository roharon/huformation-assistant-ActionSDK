const {SimpleResponse, Suggestions} = require('actions-on-google');
const caf = require('./var.js');

// Show button (SEOUL, GLOBAL)
// It will be deleted when DB set-up&connecting is done.

module.exports = (conv) => {
    var sugg;
    var ssml;
    if(conv.user.last.seen) {
        ssml = '<speak>' +
        "<p><s>안녕하세요." 
        + conv.user.profile.given_name + "님</s>"
        + "<s>원하시는 식당을 선택해주세요</s>"
        + "</p> </speak>";
        //conv.user.profile.given_name 미해결.
        // undefined로 출력됨. 추후 수정 필요

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
        ssml = '<speak>' + "<p><s>안녕하세요."
        + conv.user.profile.given_name
        + "님</s>"
        + "<s>원하시는 캠퍼스를 말씀해주세요.</s>"
        + "</p> </speak>";

        sugg = caf.CAMPUS
    }
    
    // 캠퍼스 분류 후, 수정예정

    conv.ask(ssml)
    conv.ask(sugg)
    console.log('== intent_main ACTIVATED! ==')
}
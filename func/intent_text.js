const {Image, Table, Button, Suggestions} = require('actions-on-google');

const caf = require('./var');
const intent_MAIN = require('./intent_main');
const get_Cafe = require('./menu_get')
// load Suggestions Button

module.exports = (conv, input) => {
  try {
    if(input == '글로벌캠퍼스'){
        conv.user.storage.campus = 'global'
        conv.ask('글로벌캠퍼스에 있는 식당입니다')
        conv.ask(caf.GLOBAL_CAFE)
    }
    else if(input == '서울캠퍼스'){
        conv.user.storage.campus = 'seoul'
        conv.ask('서울캠퍼스에 있는 식당입니다')
        conv.ask(caf.SEOUL_CAFE)
        
    }
    else if(input == '캠퍼스 변경'){
        conv.ask('캠퍼스를 선택해주세요')
        conv.ask(caf.CAMPUS)
    }
    else if(input == '처음으로'){
        intent_MAIN(conv)
    }
    else if(caf.ALLCAFE.includes(input)){
        var cafe_name = null
        if(input == '후생관'){
            cafe_name = 'hooseng'
        }
        else if(input == '어문관'){
            cafe_name = 'umoon'
        }
        //console.log(input)
        console.log(cafe_name)


        get_Cafe(conv, cafe_name)
        intent_MAIN(conv)

          
    }
    else {
        conv.ask("지원하지 않는 명령입니다")
        conv.ask(caf.CAMPUS)
    }
    console.log(input)
  }
  catch(e) {
    conv.ask('오류가 났어요! 개발자에게 알려주세요')
    console.log(e)
    conv.ask(e)
  }
}
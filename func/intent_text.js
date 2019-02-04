const {Image, Table, Button, Suggestions} = require('actions-on-google');

const caf = require('./var');
const intent_MAIN = require('./intent_main');
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
        conv.ask(input + " 메뉴를 알려드리겠습니다.")
        conv.ask(new Table({
            title: input + ' 메뉴',
            subtitle: '<오늘 날짜>',
            image: new Image({
              url: 'https://user-images.githubusercontent.com/4939738/51440015-3c95c100-1d05-11e9-8f86-30c5ccd0b45f.jpg',
              alt: 'Meal'
            }),
            columns: [
              {
                header: '메뉴 1',
                align: 'CENTER',
              },
              {
                header: '메뉴 2',
                align: 'CENTER',
              },
              {
                header: '메뉴 3',
                align: 'CENTER',
              },
            ],
            //dividerAfter는 어시스턴트의 테이블에서 cells다음에 나올 line을 의미
            rows: [
              {
                cells: ['순두부찌개', '된장찌개', '뭔지 모를 제육볶음'],
                dividerAfter: false,
              },
              {
                cells: ['순대 간포함', '김말이', '떡볶이'],
                dividerAfter: true,
              },
              {
                cells: ['순대 간포함', '김말이', '떡볶이'],
                dividerAfter: true,
              },
              {
                cells: ['순대 간포함', '폴스->', '디바이드애프터'],
                dividerAfter: false,
              },
              {
                cells: ['3000원', '1500원', '2700원'],
              },
            ],
          }))
          
          if (conv.user.storage.campus == 'global') {
            conv.ask(caf.GLOBAL_CAFE)
          }
          else {
            conv.ask(caf.SEOUL_CAFE)
          }
          
    }
    else {
        conv.ask("지원하지 않는 명령입니다")
        conv.ask(caf.CAMPUS)
    }
    console.log(input)
  }
  catch(e) {
    conv.ask('오류가 났어요! 개발자에게 알려주세요')
    conv.ask(e)
  }
}
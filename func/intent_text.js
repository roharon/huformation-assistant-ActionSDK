const {SimpleResponse, Image, Table, Button, Suggestions} = require('actions-on-google');
const caf = require('./var.js')
// load Suggestions Button

module.exports = (conv, input) => {
    conv.ask(input)

    if(input == '글로벌캠퍼스'){
        conv.ask(caf.GLOBAL_CAFE)
    }
    else if(input == '서울캠퍼스'){
        conv.ask(caf.SEOUL_CAFE)
    }
    else if(input == '처음으로'){
        conv.ask(caf.CAMPUS)
    }
    else if(caf.ALLCAFE.includes(input)){
        conv.ask(new Table({
            title: '${input} 메뉴',
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
            buttons: new Button({
              title: 'Developer',
              url: 'https://info.aaronroh.org'
            }),
          }))

          conv.ask(caf.CAMPUS)
    }
    else{
        conv.ask(caf.CAMPUS)
    }
    console.log(input)
}
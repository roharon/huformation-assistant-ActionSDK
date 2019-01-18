const express = require('express')
const bodyParser = require('body-parser')
const {Button, Image, Table, SimpleResponse, Suggestions,actionssdk} = require('actions-on-google')

const https = require('https');
const fs = require('fs');

var options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
}
var port1 = 3005;
var port2 = 443;
const expressApp = express().use(bodyParser.json())
const app = actionssdk({debug: true});

const CAMPUS = new Suggestions('서울캠퍼스', '글로벌캠퍼스')
const GLOBAL_CAFE = new Suggestions('후생관', '어문관', '기숙사식당', '후생관 교직원','국제사회교육원')
const SEOUL_CAFE = new Suggestions('인문관','교수회관','스카이 라운지')
const ALL_CAFE = ['후생관', '어문관', '기숙사식당', '후생관 교직원','국제사회교육원','인문관','교수회관','스카이 라운지']

https.createServer(options, expressApp).listen(port2, function(){  
    console.log("Https server listening on port " + port2);
  });

app.intent('actions.intent.MAIN', (conv) => {
    conv.ask(new SimpleResponse({
        speech: "안녕하세요 <break time='0.5'/>"
        + "외대학식입니다. <break time='1'/>"
        + "원하시는 식당을 말씀해주세요.",
        text: "외대학식입니다\n원하시는 캠퍼스를 눌러주세요"
    }));
    conv.ask(new SimpleResponse({
        speech: "아이디 말하는중",
        text: conv.id
    }))
    conv.ask(CAMPUS)
})

app.intent('actions.intent.TEXT', (conv, input) => {
    conv.ask(input)

    if(input == '글로벌캠퍼스'){
        conv.ask(new SimpleResponse({
            speech: ""
        }))
        conv.ask(GLOBAL_CAFE)
    }
    else if(input == '서울캠퍼스'){
        conv.ask(SEOUL_CAFE)
    }
    else if(input == '처음으로'){
        conv.ask(CAMPUS)
    }
    else if(ALL_CAFE.includes(input)){
        conv.ask(new Table({
            title: '${input} 메뉴',
            subtitle: '<오늘 날짜>',
            image: new Image({
              url: 'https://avatars0.githubusercontent.com/u/23533486',
              alt: 'Actions on Google'
            }),
            columns: [
              {
                header: 'header 1',
                align: 'CENTER',
              },
              {
                header: 'header 2',
                align: 'LEADING',
              },
              {
                header: 'header 3',
                align: 'TRAILING',
              },
            ],
            rows: [
              {
                cells: ['row 1 item 1', 'row 1 item 2', 'row 1 item 3'],
                dividerAfter: false,
              },
              {
                cells: ['row 2 item 1', 'row 2 item 2', 'row 2 item 3'],
                dividerAfter: true,
              },
              {
                cells: ['row 2 item 1', 'row 2 item 2', 'row 2 item 3'],
              },
            ],
            buttons: new Button({
              title: 'Button Title',
              url: 'https://github.com/actions-on-google'
            }),
          }))
    }
    else{
        conv.ask(new Suggestions('처음으로'))
    }
    console.log(input)
})

app.intent('com.huformation.ShowCafe', (conv, {cafe_name}) => {
    conv.ask('${cafe_name} 입니다.')
    console.log(conv)
})

expressApp.post('/fulfillment', app)
/*

expressApp.listen(port1, () => {
    console.log("= Assistant Server on. Port " + port + " =" )
})
*/
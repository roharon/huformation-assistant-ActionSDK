const express = require('express')
const bodyParser = require('body-parser')
const {Image, dialogflow} = require('actions-on-google')
const expressApp = express().use(bodyParser.json())

const app = dialogflow({debug: true});

app.intent('Default Welcome Intent', conv => {
    conv.ask("안녕하세요, 외대학식입니다")
    conv.ask('$conv.user.name.display 의 끼니를 위해 메뉴를 불러옵니다')
})

app.intent('Default Fallback Intent', conv => {
    conv.ask('이해하지 못했어요')
})

app.intent('Show cafeteria', (conv, {cafe_name}) => {
    conv.ask('${cafe_name} 입니다.')
})

expressApp.post('/fulfillment', app)
expressApp.listen(3005, () => {
    console.log("Assistant Server on ")
})
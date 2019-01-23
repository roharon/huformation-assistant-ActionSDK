const express = require('express')
const bodyParser = require('body-parser')
const {Suggestions, actionssdk} = require('actions-on-google')

const https = require('https');
const fs = require('fs');

var options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
}
var port1 = 3005;
var port2 = 443;
const expressApp = express().use(bodyParser.json());
const app = actionssdk({debug: true});

const intent_MAIN = require('./func/intent_main.js');
const intent_TEXT = require('./func/intent_text.js')

https.createServer(options, expressApp).listen(port2, function(){  
    console.log("Https server listening on port " + port2);
  });

app.intent('actions.intent.MAIN', (conv) => {
    intent_MAIN(conv);
});

app.intent('actions.intent.TEXT', (conv, input) => {
    intent_TEXT(conv, input)
    
});

app.intent('com.huformation.ShowCafe', (conv, {cafe_name}) => {
    conv.ask('${cafe_name} 입니다.')
    console.log(conv)
})

app.intent('actions.intent.CANCEL', (conv) => {
    conv.close('외대학식을 종료합니다')
})

expressApp.post('/fulfillment', app)
/*

expressApp.listen(port1, () => {
    console.log("= Assistant Server on. Port " + port + " =" )
})
*/
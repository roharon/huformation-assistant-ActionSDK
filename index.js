const express = require('express')
const bodyParser = require('body-parser')
const {Suggestions, actionssdk} = require('actions-on-google')

const https = require('https');
const fs = require('fs');

const intent_showcafe = require('./func/ShowCafe')

var options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
}
var port1 = 3005;
var port2 = 443;
const expressApp = express(debug=true).use(bodyParser.json());
const app = actionssdk();

const intent_MAIN = require('./func/intent_main.js');
const intent_TEXT = require('./func/intent_text.js');
const caf = require('./func/var');

https.createServer(options, expressApp).listen(port2, function(){  
    console.log("Https server listening on port " + port2)
  });

app.intent('actions.intent.MAIN', (conv) => {
    intent_MAIN(conv)
});

app.intent('com.huformation.ShowCafe', (conv, {cafe_name}) => {
    // invocation에서 동작함.
    // '외대학식에게 후생관 메뉴 물어보기'
    intent_showcafe(conv)
    console.log(conv)
})

app.intent('actions.intent.TEXT', (conv, input) => {
    intent_TEXT(conv, input)
    
});

app.intent('actions.intent.CANCEL', (conv) => {
    conv.close('외대학식을 종료합니다')
});

app.intent('actions.intent.PERMISSION', (conv) => {
    conv.user.storage.userName = conv.user.raw.profile.displayName    
    intent_MAIN(conv);
});

expressApp.post('/fulfillment', app)
/*

expressApp.listen(port1, () => {
    console.log("= Assistant Server on. Port " + port + " =" )
})
*/
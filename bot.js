const tmi = require('tmi.js');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const fs = require('fs');

dotenv.config();

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

const smtpTransport = nodemailer.createTransport(
  smtpPool({
    service: 'Gmail',
    host: 'localhost',
    port: '465',
    tls: {
      rejectUnauthorized: false,
    },

    //이메일 전송을 위해 필요한 인증정보

    //gmail 계정과 암호
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PW,
    },
  })
);

var ignore_list = [
  process.env.CHANNEL_NAME,
  'bbangddeock',
  'Nightbot',
];
var user_list = [];
var chulSuk = false;

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!출석시작' && context.username === ignore_list[0] && chulSuk === false) { // 방장만 가능한 명령어
    chulSuk = true;
    user_list = [];
    client.say(target, `[출석리셋] 출석표가 초기화 되었습니다.`);
  } else if(commandName === '!출석끝' && context.username === ignore_list[0] && chulSuk === true){ // 방장만 가능한 명령어
    let todayList = '';
    for(let i=0;i<user_list.length;i++){
      todayList = `${todayList}${i+1}. ${user_list[i]}<br>`
    }
    
    const mailOpt = {
      from: process.env.EMAIL_NAME,
      to: process.env.RECEIVER_EMAIL,
      subject: '금일의 출석표',
      html: todayList,
    };
    smtpTransport.sendMail(mailOpt, function(err, res) {
      if (err) {
        console.log(err);
        client.say(target,'띠용 뭔가 잘못되고있어 ㅠ_ㅠ 대충 백업은 했는데 링크드불러바');
        fs.writeFile('./chulSuk.txt',todayList.replace('<br>','\n'),function(err){
			if(err){
				console.log(`Error ${err}`);
			}
			console.log('파일에 대신 저장했습니다');
		});
      } else {
        console.log('Message send :' + res);
        client.say(target,'출석표를 보내놨습니다 ㅎㅎ');
        chulSuk = false;
      }
    });
  }
  else if(chulSuk === true && ignore_list.indexOf(context.username) === -1) { // ignore_list에 없는 유저만 읽기
    const usrName = context['display-name'];
    if(user_list.indexOf(usrName) === -1){
      user_list.push(usrName);
      console.log(`Pushed ${usrName} to ChulsukBoo`);
      //client.say(target, `${usrName} 님 반갑습니다. 데스노트적힘 ㅅㄱ`);
    }

  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

# 트위치 감성돔회 출석봇

채팅을 친 순서대로 유저들의 명단을 작성해주고
방송종료 전에 명단을 이메일로 보내주는 채팅봇

## 명령어

!출석시작 : 입력한 시점부터 유저들은 카운트함. ignore_list에 있는 계정들은 받아적지않고, 한번 입력한 유저는 두번받아적지않음

!출석끝 : 지정된 이메일로 출석부명단을 보내줌.

해당 명령어들은 방송을 송출중인 스트리머 본인만 실행가능한 명령어임.

### Environment Variables
 
| *Variable*  | *Description*   |
|---|---|---|---|---|
| `BOT_USERNAME`  |  The account (username) that the chatbot uses to send chat messages. This can be your Twitch account. Alternately, many developers choose to create a second Twitch account for their bot, so it's clear from whom the messages originate. |  
|`CHANNEL_NAME`   |  The Twitch channel name where you want to run the bot. Usually this is your main Twitch account.
|`OAUTH_TOKEN`   |The token to authenticate your chatbot with Twitch's servers. Generate this with [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/) (a Twitch community-driven wrapper around the Twitch API), while logged in to your chatbot account. The token will be an alphanumeric string.|  
|`EMAIL_NAME` | 메일을 보내는 계정(gmail) |
|`EMAIL_PW` | 메일을 보내는 계정의 비밀번호 |
|`RECEIVeR_EMAIL` | 출석부를 받을 이메일주소 |


### 주의

현재 보내는 이메일은 gmail만 설정가능.

gmail에서 보안수준이 낮은 앱의 액세스를 허용해야 사용가능하므로, 가계정을 만들어서 사용하는 것을 추천함

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Required

### /public/firebase-messaging-sw.js

FCM 서비스 워커 설정을 위한 파일

```
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: FCM API 키,
  authDomain: FCM 인증 도메인,
  projectId: FCM 프로젝트 ID,
  storageBucket: FCM 저장소 버킷,
  messagingSenderId: FCM 클라우드 메시지 발신자 ID,
  appId: FCM App ID
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
```

### /.env

프로젝트 환경변수 파일

```
REACT_APP_API_URL=API 서버 도메인
REACT_APP_FCM_API_KEY=FCM API 키
REACT_APP_FCM_AUTH_DOMAIN=FCM 인증 도메인
REACT_APP_FCM_PROJECT_ID=FCM 프로젝트 ID
REACT_APP_FCM_STORAGE_BUCKET=FCM 저장소 버킷
REACT_APP_FCM_APP_ID=FCM App ID
REACT_APP_FCM_VAPID_PUBLIC_KEY=FCM VAPID 키
REACT_APP_FCM_MESSAGING_SENDER_ID=FCM 클라우드 메시지 발신자 ID
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// FCM 로직을 위해 보류
const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FCM_API_KEY,
    authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FCM_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FCM_APP_ID,
  };

  useEffect(() => {
    const session_token = sessionStorage.getItem("token");
    if (!session_token) {
      navigate("/login");
    } else {
      setUserName(sessionStorage.getItem("userName"));
      setRole(sessionStorage.getItem("role"));
      setUserId(sessionStorage.getItem("userId"));
      setToken(session_token);

      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          const app = initializeApp(firebaseConfig);
          const messaging = getMessaging(app);

          // 백그라운드 푸시 설정
          getToken(messaging, {
            vapidKey: process.env.REACT_APP_FCM_VAPID_PUBLIC_KEY,
          }).then((currentToken) => {
            if (currentToken) {
              console.log("currentToken: ", currentToken);
              if (token !== currentToken) setToken(currentToken);
              // 수정 API 필요
              // 현재 토큰이 서버의 DB와 내용 다른지 비교 후 수정
            } else {
              console.log("Can not get token");
            }
          });

          // 포그라운드 푸시 설정
          onMessage(messaging, (payload) => {
            var title = payload.notification.title;
            var options = {
              body: payload.notification.body,
            };

            new Notification(title, options);
          });
        } else {
          console.log("Do not have permission!");
        }
      });
    }
  }, []);

  return (
    <div>
      <h1>유저 정보</h1>
      <h2>이름: {userName}</h2>
      <h3>아이디: {userId}</h3>
      <h3>역할: {role}</h3>
    </div>
  );
};

export default Home;

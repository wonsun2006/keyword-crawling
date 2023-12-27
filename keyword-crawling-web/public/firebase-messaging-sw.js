importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCrx4hX_oyNg9Ago__igOlR_zP3sFLMVoo",
  authDomain: "keyword-crawling-95744.firebaseapp.com",
  projectId: "keyword-crawling-95744",
  storageBucket: "keyword-crawling-95744.appspot.com",
  messagingSenderId: "794539820257",
  appId: "1:794539820257:web:fde89829e5e95f8b4d23a0"
};

firebase.initializeApp("BNBLamzgqTg9-evmWyPH0mgz4WQpsiDnzf79tqNgtBnd0OnpJfJ6GO1gOyC_ggcj66rySoESeieo7YgF9iX3Egs");

const messaging = firebase.messaging();
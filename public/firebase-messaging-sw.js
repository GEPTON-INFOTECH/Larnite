importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCqdDrx9Yx8rJZ6oX8MR48iIarRKOO3wfU",
  authDomain: "halite-d0150.firebaseapp.com",
  projectId: "halite-d0150",
  storageBucket: "halite-d0150.appspot.com",
  messagingSenderId: "889279604799",
  appId: "1:889279604799:web:bfca081df06a488a0bf08a",
  measurementId: "G-YW46ZKH3SN"
};

firebase.default.initializeApp(firebaseConfig);

const messaging = firebase.default.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(payload);
  const notificationOption={
      body: payload.notification.body,
      data: {
        click_action: payload.data.link
      }
    };

  return self.registration.showNotification(payload.notification.title,notificationOption);
});

self.addEventListener('notificationclick',function (event){
    console.log(event.notification);
    var action_click = event.notification.data.click_action;
    event.notification.close();

    clients.openWindow(action_click)
});


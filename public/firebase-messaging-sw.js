importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

var firebaseConfig = {
  apiKey: "AIzaSyDaV_KSKdQ6-Ov7OEgfaDQ8BeCxE_0xNDY",
  authDomain: "pyfin-48d4f.firebaseapp.com",
  projectId: "pyfin-48d4f",
  storageBucket: "pyfin-48d4f.appspot.com",
  messagingSenderId: "494253229078",
  appId: "1:494253229078:web:4c8a5206fc9a8eac3d6137"
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


import firebase from 'firebase'
import 'firebase/messaging';

var firebaseConfig = {
  apiKey: "AIzaSyDaV_KSKdQ6-Ov7OEgfaDQ8BeCxE_0xNDY",
  authDomain: "pyfin-48d4f.firebaseapp.com",
  projectId: "pyfin-48d4f",
  storageBucket: "pyfin-48d4f.appspot.com",
  messagingSenderId: "494253229078",
  appId: "1:494253229078:web:4c8a5206fc9a8eac3d6137"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onMessage((payload) => {
  console.log(payload);
  const notificationOption={
      body:payload.notification.body,
      data: {
        click_action: payload.data.link
      }
  };

  if(Notification.permission==="granted"){
      var notification=new Notification(payload.notification.title,notificationOption);

      notification.onclick=function (ev) {
          ev.preventDefault();
          window.open(payload.notification.click_action,'_blank');
          notification.close();
      }
  }
});


export default firebase;

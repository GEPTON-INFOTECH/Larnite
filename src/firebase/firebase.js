import firebase from 'firebase'
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCqdDrx9Yx8rJZ6oX8MR48iIarRKOO3wfU",
    authDomain: "halite-d0150.firebaseapp.com",
    projectId: "halite-d0150",
    storageBucket: "halite-d0150.appspot.com",
    messagingSenderId: "889279604799",
    appId: "1:889279604799:web:bfca081df06a488a0bf08a",
    measurementId: "G-YW46ZKH3SN"
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

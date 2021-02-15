import { BrowserRouter, Route,Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import Auth from './components/auth/Auth';
import Home from './components/Home';
import { Provider, useSelector, useDispatch } from 'react-redux';
import Profile from './components/profile/Profile';
import Protected from './components/shared/protected/Protected';
import Courses from './components/courses/Courses';
import Papers from './components/papers/Papers';
import ChapterContent from './components/papers/ChapterContent';
import 'firebase/messaging';
import firebase from './firebase/firebase';
import React,{useEffect} from 'react';
import { loginUserAuth } from './redux/auth/Actions';

function App() {
  const serverKey = 'BIbdqnrxb-Kijs9iQTPV1gOZSw-9GYR4u3INSELX20fXs-KusVx5NzJzmUkw_-ERa-E5OdGamyRYn9XaAAPxNuA';
  const user = useSelector(state => state.uReducer);
  const dispatch = useDispatch();
  useEffect(async ()=>{
    try {
        const messaging = firebase.messaging();
        let token = await messaging.getToken({vapidKey: serverKey});
        // CHECK IF AUTHENTICATED & SEND IT TO DB TO STORE AS deviceToken
        if(token) {
          console.log('Current Token is: ',token);
            const db = firebase.firestore().collection('students');
            await db.doc(user.user.phone).update({
              deviceToken: token
            });
            let userData = (await db.doc(user.user.phone).get()).data();
            dispatch(loginUserAuth(userData,false));
      }
    } catch(e){
      console.log(e);
      console.log('Error Occured');
    }
  },[]);

  return (
    <BrowserRouter>
      <div className="App content-container">
          <Navbar />

          {/* ROUTES */}

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={Auth}/>
            <Protected path="/profile" exact component={Profile} />
            <Protected path="/courses" exact component={Courses} />

            {/* <Protected path="/papers/:paperName" exact component={Papers} /> */}
            <Route  path={['/:courseName/:paperName']} render={
               (props) => (
                 <>
                    <Papers {...props} />
                    <div className="text-left paper-content ">
                       <Route path="/:courseName/:paperName" exact render={(p) => <ChapterContent {...p} />} />
                       <Route path="/:courseName/:paperName/:chapterName" exact render={(p) => <ChapterContent {...p} />} />
                       <Route path="/:courseName/:paperName/:chapterName/:topicName" exact render={(p) => <ChapterContent {...p} />} />     
                    </div>
                </>
               )
            }>
              
            </Route>
          </Switch>
          {/* END OF ROUTES */}
      </div>
    </BrowserRouter>
  );
}

export default App;

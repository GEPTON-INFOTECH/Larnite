import { BrowserRouter, Route,Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import Auth from './components/auth/Auth';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './redux/store';
import Profile from './components/profile/Profile';
import Protected from './components/shared/protected/Protected';
import Courses from './components/courses/Courses';
import Papers from './components/papers/Papers';
import ChapterContent from './components/papers/ChapterContent';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
          <Navbar />
          {/* ROUTES */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={Auth}/>
            <Protected path="/profile" exact component={Profile} />
            <Protected path="/courses" exact component={Courses} />
            {/* <Protected path="/papers/:paperName" exact component={Papers} /> */}
            <Route path={['/papers/:paperName']} render={
               (props) => (
                 <>
                    <Papers {...props} />
                    <div className="text-left paper-content">
                       <Route path="/papers/:paperName" exact render={(p) => <ChapterContent {...p} />} />
                       <Route path="/papers/:paperName/:chapterName" exact render={(p) => <ChapterContent {...p} />} />
                       <Route path="/papers/:paperName/:chapterName/:topicName" exact render={(p) => <ChapterContent {...p} />} />

                    </div>
                </>
               )
            }>
              
            </Route>
          </Switch>
          {/* END OF ROUTES */}
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

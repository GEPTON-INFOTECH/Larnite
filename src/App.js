import { BrowserRouter, Route,Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import Auth from './components/auth/Auth';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './redux/store';
import Profile from './components/profile/Profile';
import Protected from './components/shared/protected/Protected';

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
          </Switch>
          {/* END OF ROUTES */}
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

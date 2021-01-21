import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import Auth from './components/auth/Auth';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Navbar />
          {/* ROUTES */}
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Auth}/>
          {/* END OF ROUTES */}
      </div>
    </BrowserRouter>
  );
}

export default App;

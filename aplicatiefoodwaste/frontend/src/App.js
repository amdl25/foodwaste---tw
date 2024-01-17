import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/login" element = {<LoginForm/>} />
        <Route path="/signup" element = {<SignupForm/>} />
      </Routes>

    </div>
  );
}

export default App;

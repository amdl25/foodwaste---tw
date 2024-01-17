import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Principal from './pages/Principal';
import AddProduct from './pages/AddProduct';
import FriendshipDisplay from './pages/FriendshipDisplay';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/login" element = {<LoginForm/>} />
        <Route path="/signup" element = {<SignupForm/>} />
        <Route path="/login/principal/:userEmail" element = {<Principal/>} />
        <Route path="/login/principal/add-product/:userEmail" element = {<AddProduct/>} />
        <Route path="/login/principal/friendship/:userEmail" element = {<FriendshipDisplay/>} />
      </Routes>

    </div>
  );
}

export default App;

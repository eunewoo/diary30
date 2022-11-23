import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit from './pages/Edit.js';
import Log from './pages/Log.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import View from './pages/View.js';
import Profile from './pages/Profile.js';
import React, {useState} from 'react';

function App() {
  const [id,setId] = useState({});
  const [profile, setProfile]= useState({
    profile: '', //profile picture url
    name: '',
    email: '',
    address1 : '',
    address2 : ''
  });
  const [questions, setQuestions] = useState({});
  function ChangeProfile(profile, name, email, address1, address2) {
    setProfile({
      profile: profile, //profile picture url
      name: name,
      email: email,
      address1 : address1,
      address2 : address2
    })

  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login setId={ChangeProfile}/>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/log"  element={<Log />} />
        <Route exact path="/edit" element={<Edit />} />
        <Route exact path="/view" element={<View />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

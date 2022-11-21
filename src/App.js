import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit from './pages/Edit.js';
import Log from './pages/Log.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import View from './pages/view';
import Profile from './pages/Profile.js';
import React, {useState} from 'react';

function App() {
  const [id,setId] = useState({});
  const [profile, setProfile]= useState({
    id: '', // this is the id for db.
    profile: '', //profile picture
    name: '',
    email: '',
    address1 : '',
    address2 : ''
  });
  const [questions, setQuestions] = useState({});

  function ChangeProfile(pf) {
    setProfile(pf);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/log"  element={<Log />} />
        <Route exact path="/edit" element={<Edit />} />
        <Route exact path="/view" element={<View />} />
        <Route exact path="/profile" element={<Profile profile={profile} changeProfile={ChangeProfile}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit from './pages/Edit.js';
import Log from './pages/Log.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import View from './pages/view';
import React, {useState} from 'react';

function App() {
  const [id,setId] = useState({});
  const [profile, setProfile]= useState({
    profile: '', //profile picture
    name: '',
    email: '',
    address1 : '',
    address2 : ''
  });
  const [questions, setQuestions] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/log"  element={<Log />} />
        <Route exact path="/edit" element={<Edit />} />
        <Route exact path="/view" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

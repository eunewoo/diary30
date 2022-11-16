import './App.css';
import { Route, Routes } from 'react-router-dom';
import Edit from './pages/edit';
import Log from './pages/log';
import Login from './pages/login';
import Register from './pages/register';
import View from './pages/view';
import {useState} from 'react';

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
    <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/log"  element={<Log />} />
        <Route exact path="/edit" element={<Edit />} />
        <Route exact path="/view" element={<View />} />
      </Routes>
  );
}

export default App;

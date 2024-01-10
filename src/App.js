import './App.css';
import { useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const BE_URL = "http://localhost:3214"

function App() {
  useEffect(() => {
    // fetch(BE_URL).then(res => res.json())
    // .then(data => console.log('DATA::', data))
    // .catch(err => console.log('ERR::', err))

    // fetch(BE_URL+ '/login', {
    //   method:"POST",
    //   headers: {
    //     "Content-Type": 'application/json'
    //   },
    //   body: JSON.stringify({user: "test1"})
    // }).then(res => res.json())
    // .then(data => console.log('POST::', data))
    // .catch(err => console.log('POST::ERRR::', err))
  }, [])
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/welcome' element={<Welcome/>}/>


        </Routes>
    </BrowserRouter>
  );
}

export default App;

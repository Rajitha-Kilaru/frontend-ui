import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const BE_URL = "http://localhost:3214"

function App() {
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

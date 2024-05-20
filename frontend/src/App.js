import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import AddUser from './components/admin/AddUser';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import './toast.css';
import AdminHeader from './components/AdminHeader';

function App() {
  return (
    <div className='container'>
    <BrowserRouter>
    <Routes>
    <Route path='/admin/*' element={<AdminHeader/>}/>
    <Route path='*' element= {<Header/>}/>
    </Routes>

    <Routes>
      <Route path = '/admin/login' element = {<AdminLogin/>}/>
      <Route path='/admin/dashboard' element = {<AdminDashboard/>}/>
      <Route path='/admin/adduser' element = {<AddUser/>}/>

    </Routes>
    
      <Routes>
        <Route path='/' element = {<Dashboard/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/user' element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer className="toast-container" />
    </div>
  );
}

export default App;

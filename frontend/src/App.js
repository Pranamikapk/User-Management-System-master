import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminHeader from './components/AdminHeader';
import Header from './components/Header';
import AddUser from './components/admin/AddUser';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import './toast.css';

function App() {
  const { admin } = useSelector((state) => state.adminAuth);
  const { user } = useSelector((state) =>state.auth)
  return (
    <div className='container'>
    <BrowserRouter>
    <Routes>
    <Route path='/admin/*' element={<AdminHeader/>}/>
    <Route path='*' element= {<Header/>}/>
    </Routes>

    <Routes>
      <Route path = '/admin/login' element = {admin ? <Navigate to = "/admin/dashboard"/> : <AdminLogin/>}/>
      <Route path = '/admin/dashboard' element = {admin ? <AdminDashboard/> : <Navigate to = "/admin/login"/>}/>
      <Route path = '/admin/adduser' element = {admin ?<AddUser/> : <Navigate to = "/admin/login"/>}/>

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

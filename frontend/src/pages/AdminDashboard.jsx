import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserList from '../components/admin/UserList'

function AdminDashboard() {
    const {admin} = useSelector((state) => state.adminAuth)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!admin){
            navigate('/admin/login')
        }
    },[admin,navigate])
  return (
    <>
        <section className='heading'>
            <h1>Welcome {admin && admin.name}</h1>
            <p>Admin Dashboard</p>
            <div>
                {" "}
                <button className='btn' onClick={()=> navigate('/admin/adduser')}>
                    Add User
                </button>
            </div>
        </section>

        <section>
            <UserList/>
        </section>
    </>
  )
}

export default AdminDashboard
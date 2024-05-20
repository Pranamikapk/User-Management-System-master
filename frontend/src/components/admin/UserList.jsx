import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { blockUser, editUser, getAllusers, reset } from '../../features/admin/adminSlice'
import './UserList.css'

function UserList() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.adminAuth.users || [])
    const [searchQuery , setSearch] = useState("")
    const [filteredUsers , setFilteredUsers] = useState([])

    useEffect(()=>{
        dispatch(getAllusers())
        return () =>{
            dispatch(reset())
        }
    },[dispatch])

    useEffect(() =>{
        if(searchQuery.trim() === ""){
            setFilteredUsers(users)
        }else{
            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
            ) 
            setFilteredUsers(filtered)
        }
    },[searchQuery,users])

    const handleEdit = (userId, name, email) =>{
        const newName = prompt("Enter your New Name: ",name)
        const newEmail = prompt('Enter your new Email:',email)

        if(newName === null || newEmail === null){
            return
        }

        if(newName && newEmail){
            dispatch(editUser({userId,name: newName , email: newEmail}))
        }
    }

    const handleBlock = (userId) =>{
        if(window.confirm("Are you sure you want to block the user?")){
            console.log("userId",userId);
            dispatch(blockUser(userId))
        }
    }
  return (
    <div className='user-list'>
        <div style={{display: 'flex'}} className="form-group">
            <input
            style={{height: '35px'}}
            className='form-control'
            placeholder='Search 

            /Email' 
            type="text"
            value={searchQuery}
            onChange={(e)=>setSearch(e.target.value)}
             />
             <button style={{ height : '35px' , marginLeft:"20px"}}
             className='btn-1'>
                {" "}
                <FaSearch/>Search
             </button>
        </div>

        {filteredUsers && filteredUsers.length > 0 ? (
            <table className='user-table' >
                <thead>
                    <tr>
                        <th scope='col'>Sl No</th>
                        <th scope='col'>Photo</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user,index)=>(
                        user && (
                        <tr key ={index}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="profile-image-container" style={{borderRadius:"30%"}}>
                                    <img
                                    className='user-image' 
                                    src={
                                        user?.image?
                                        user.image:
                                        "https://avatar.iran.liara.run/public/boy?username=Ash"
                                    } alt="User 2"
                                    style={{width:"100px", height:"100px" , borderRadius:"30%"}} />
                                </div>
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isBlocked ? "Blocked" : "Unblocked"}</td>
                            <td className='action-buttons'>
                                <div className="table-button">
                                    <button onClick={()=>handleBlock(user._id)} className='btn'>
                                        {user.isBlocked ? "Unblock": "Block"}
                                    </button>
                                    <button onClick={()=>
                                        handleEdit(user._id,user.name,user.email)
                                    }
                                    className='btn'>
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                        )
                    ))}
                </tbody>
            </table>
        ):(
            <p>No users available</p>
        )}
    </div>
  )
}

export default UserList
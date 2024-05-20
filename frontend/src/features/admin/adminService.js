import axios from 'axios'
const API_URL = '/api/admin/'

//Admin login
const login = async(adminData) =>{
    const response = await axios.post(API_URL + 'login', adminData)
    if(response.data){
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}

//admin logout
const logout = () =>{
    localStorage.removeItem('admin')
}

const getAllusers = async(token)=>{
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'getUser',config)
    return response.data
}

const editUser = async(token, userId, name, email )=>{
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'editUser',{userId,name,email},config)

}

const blockUser = async()=>{

}

const adminService = {
    login,
    logout,
    getAllusers,
    editUser,
    blockUser
}

export default adminService
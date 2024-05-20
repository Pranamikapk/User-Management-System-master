import axios from 'axios'

const API_URL = '/api/users'


//register
const register = async(userData) =>{
    const response = await axios.post(API_URL+'/register',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}


//login
const login = async(userData) =>{
    const response = await axios.post(API_URL + '/login' ,userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//update user profile
const updateProfile = async(userData,token) =>{
    const config = {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL +'/user',userData, config)
    if(response.data){
        const updatedData = {...response.data,token}
        localStorage.setItem('user',JSON.stringify(updatedData))
    }
    return response.data
}

//logout user
const logout = () =>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
    updateProfile
}

export default authService
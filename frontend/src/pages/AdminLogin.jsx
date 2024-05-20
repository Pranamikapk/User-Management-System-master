import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { login, reset } from '../features/admin/adminSlice'

function AdminLogin() {
  const [adminData , setAdminData] = useState({
    email : '',
    password: ''
  })

  const [errors,setErrors] = useState({})

  const {email,password} = adminData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {admin ,isLoading, isError , isSuccess, message} = useSelector((state) => state.adminAuth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess || admin?.post){
            navigate('/admin/getUser')
            dispatch(reset())
        }

    },[admin,isError,isSuccess, message, navigate, dispatch])

    const onChange = (e) =>{
        setAdminData((prevState) =>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        let validationError = {}

        //email validation
        if(!email || !/^\S+@\S+\.\S+$/.test(email)){
            validationError.email = 'Please enter a valid email address'
        }

        if(!password || password.length < 6){
            validationError.password = 'Password must be atleast 6 characters long'
        }

        if(Object.keys(validationError).length > 0){
            setErrors(validationError)
            return
        }

        const adminCred = {
            email,
            password
        }

        dispatch(login(adminCred))
    }


  return (
    <>
      <section className='heading'>
      <h1>
          <FaSignInAlt />Login 
      </h1>
      <p>Admin Login</p>
      </section>
      {isLoading ? (
              <Spinner />
          ) : (
          <section className='form'>
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                      <input 
                      type="email" 
                      className='form-control'
                      id='email'
                      name='email'
                      value={email}
                      placeholder='Enter your email'
                      onChange={onChange} />
                      {errors.email && <div className="error-message">{errors.email}</div> }
                  </div>
                  <div className="form-group">
                      <input 
                      type="password" 
                      className='form-control'
                      id='password'
                      name='password'
                      value={password}
                      placeholder='Enter password'
                      onChange={onChange}/>
                      {errors.password && <div className="error-message">{errors.password}</div> }
                  </div>

                  <div className="form-group">
                      <button type='submit' className='btn btn-block'>Submit</button>
                  </div>
              </form>
          </section>
      )}
  </>
  )
}

export default AdminLogin
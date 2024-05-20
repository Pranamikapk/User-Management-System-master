import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { reset, updateProfile } from '../features/auth/authSlice'
import './UserProfile.css'

function UserProfile() {
    const {user, isLoading, isError , isSuccess , message } = useSelector((state)=>state.auth)
    
    const [formData , setFormData] = useState({
        name : user ? user.name : "",
        email : user ? user.email : "",
        image: user ? user.image : "",
        imageFile: null,
    })
    

    const { name, email ,image, imageFile} = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(name,email,image);

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            toast.success('Profile updated Successfully')
        }

        if(user){
            setFormData({
                name : name || "",
                email: email || "",
                image: image || "",
                imageFile : null
            })
        }

        dispatch(reset())
    },[ user , isError , isSuccess , message , navigate , dispatch])

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))

        if(e.target.name === "image" && e.target.files.length > 0){
            setFormData((prevState) => ({
                ...prevState,
                imageFile : e.target.files[0],
                image: URL.createObjectURL(e.target.files[0])
            }))
        }
    }

    const onSubmit = async (e) =>{
        e.preventDefault()
        const validationError = validateForm()
        if(Object.keys(validationError).length>0){
            for(const key in validationError){
                toast.error(validationError[key])
            }
            return
        }

        const data = new FormData()
        data.append("file",imageFile)
        data.append("upload_preset","pjjflw06")
        data.append("cloud_name","djarfhkad")

        try{
            const cloudinaryResponse = await fetch(
                "https://api.cloudinary.com/v1_1/djarfhkad/image/upload",
                {
                    method : 'POST',
                    body: data
                }        
            )

            const cloudinaryData = await cloudinaryResponse.json()
            const imageUrl = cloudinaryData.url

            //Update userData object to include name, email and image
            const updateUserData = {
                name : formData.name,
                email: formData.email,
                image : imageUrl
            }

            dispatch(updateProfile(updateUserData))
        }catch(error){
            console.error("Error uploading image to Cloudinary:", error);
            toast.error("Error uploading image");
        }
    }

    const validateForm = () =>{
        let errors = {}
        if(!name.trim()){
            errors.name = "Name is required"
        }

        if(!email.trim()){
            errors.email = "Email is required"
        }else if(!/\S+@\S+\.\S+/.test(email)){
            errors.email = "Email is invalid"
        }
        return errors
    }
  return (
    <>
        <section className='heading'>
            <h1>Profile</h1>
        </section>
        {isLoading ? (
                <Spinner />
            ) : (
            <div className="profile-container">
                <div className="profile-image-container">
                    <img src={
                        user ?.image ? user.image :
                        "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
                    } alt="profile" className='profile-image' />
                </div>
            </div>
        )}

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                    type="text" 
                    className='form-control'
                    name="name" 
                    id="name"
                    value={name}
                    placeholder='Enter name'
                    onChange={onChange} />
                </div>
                <div className="form-group">
                    <input 
                    type="email"
                    className='form-control' 
                    name="email" 
                    id="email"
                    value={email}
                    placeholder='Enter email'
                    onChange={onChange} />
                </div>
                <div className="form-control">
                    <input 
                    type="file"
                    className='form-control' 
                    name="image" 
                    id="image"
                    onChange={onChange} />
                    {imageFile && <p>Selected file: {imageFile.name}</p> }
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>
                        Update
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default UserProfile
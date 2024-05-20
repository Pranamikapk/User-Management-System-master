import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals } from '../features/goals/goalSlice'

function Dashboard() {
const navigate = useNavigate()
const dispatch = useDispatch()

const {user} = useSelector((state) => state.auth)
const { goals ,isLoading , isError , message} = useSelector((state) => state.goal)
console.log('User:', user);
    console.log('Goals:', goals);
    console.log('isLoading:', isLoading);
    console.log('isError:', isError);
    console.log('message:', message);
useEffect(() =>{
  
  if(isError){
    console.log(message);
  }
  console.log(user);

  if(!user){
    navigate('/login')
  }
  dispatch(getGoals())
  // return() => {
  //   dispatch(reset())
  // }
},[user,isError,message,dispatch ,navigate])

if(isLoading){
  return <Spinner/>
}

  return (
    <>
    <section className='heading'>
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>

    <GoalForm/>

    <section className='content'>
      { goals.length > 0 ?(
        <div className="goals">
          {goals.map((goal)=>(
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ):(
        <h3>You have not set any goals</h3>
      )}
    </section>
    </>
  )
}

export default Dashboard
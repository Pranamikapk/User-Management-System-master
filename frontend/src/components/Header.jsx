import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Home Page</Link>
        </div>
        <ul>
            {user ? (
                <>
                    <li>
                    <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt/> Logout
                    </button>
                    </li>
                    {location.pathname !== '/user' && (
                        <li>
                            <Link to='/user'>
                                <FaUser /> Profile
                            </Link>
                        </li>
                    )}
                </>
            ):(
            <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt/>Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser/>Register
                    </Link>
                </li>
                </>
            )}
        </ul>
    </header>
  )
}

export default Header
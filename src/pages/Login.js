import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import HomeImage from '../home-image.jpg'



const Login = () => {
    const [userData, setUserData ] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const userId = localStorage.getItem('userId')
    const [statusCode, setStatusCode] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(
                'https://recap-server-k01u.onrender.com/api/v1/auth/login',
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            navigate('/home/timeline')
            console.log('token', response.data.token);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.user._id)
            localStorage.setItem('feelersName', response.data.user.firstName)
            localStorage.setItem('feelersEmail', response.data.user.email)
            setLoading(false)
            console.log('User logged in: ', response.data);
        } catch (error) {
            setLoading(false)
            setStatusCode(error.response.status)
            console.log('Error logging in: ', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prevState => ({
            ...prevState,
            [name]: value 
        }))
    }

  return (
    <div className="home">
    <form onSubmit={handleSubmit} className="welcome-div register-new-form">
        <h2 className="join-recap-text">Sign in to Recap</h2>

        <div className="login-email">
            <input className="register-inputs" 
            type="text"
            id="email"
            name="email"
            placeholder="Your Email here..."
            value={userData.email}
            onChange={handleChange}/>
        </div>

        <div className="login-password">
            <input className="register-inputs"
            placeholder="Your Password here..."
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}/>
        </div>

        {
            (statusCode === 400) && 
            <p className="error">Please fill in all the details</p>
        }
        {
            (statusCode === 401) && 
            <p className="error">You have entered a wrong email or password</p>
        }

        <button type="submit" className="register-recap-btn">Log in</button>

        <p className="no-account-text">Don't have an Account?</p>
        <a href="/register" className="register-now-link">Register now</a>
    </form>
    <div className="register-image-div">
    <img src={HomeImage} className="home-image register-image"/>
    </div>

    { loading && <div className="loading"></div>}
    </div>
  )
}

export default Login

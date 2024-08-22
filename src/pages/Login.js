import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import HomeImage from '../home-image.jpg'



const Login = () => {
    const [userData, setUserData ] = useState({
        email: '',
        password: ''
    })

    const userId = localStorage.getItem('userId')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
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
            console.log('User logged in: ', response.data);
        } catch (error) {
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

        <button type="submit" className="register-recap-btn">Log in</button>

        <p className="no-account-text">Don't have an Account?</p>
        <a href="/register" className="register-now-link">Register now</a>
    </form>
    <div className="register-image-div">
    <img src={HomeImage} className="home-image register-image"/>
    </div>
    </div>
  )
}

export default Login

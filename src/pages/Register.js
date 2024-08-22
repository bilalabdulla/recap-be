import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import HomeImage from '../home-image.jpg'


const Register = () => {
    const [userData, setUserData] = useState({
        firstName: 'alejandro',
        lastName: 'garnacho',
        gender: 'male',
        email: 'garnacho@gmail.com',
        password: 'united'
    })

    const navigate= useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'https://recap-server-k01u.onrender.com/api/v1/auth/register',
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmEyMmVjOWExZGYxNzc4YTViYTczZDMiLCJpYXQiOjE3MjE5MDQ4NDEsImV4cCI6MTcyNDQ5Njg0MX0.buLedgxqW09DKln6ojxCZOYsklHUegZ607KBVcRGPpE'
                    }
                }
            )
            const token = response.data.token
            localStorage.setItem('userId', response.data.user._id)
            localStorage.setItem('feelersName', response.data.user.firstName)
            localStorage.setItem('feelersEmail', response.data.user.email)
            localStorage.setItem('token', token)
            console.log('User created: ', response.data);
            navigate('/home/timeline')
        } catch (error) {
            console.error('Error creating user', error)
        }
    }


    return (
    <div className="home">
        <form onSubmit={handleSubmit} className="welcome-div register-new-form">

            <h2 className="join-recap-text">Join Recap family now</h2>

            <div>
                <input 
                className="register-inputs"
                placeholder="Enter first name..."
                type="text"
                id="name"
                name="name"
                onChange={(e) => setUserData({...userData, firstName: e.target.value})}/>
            </div>

            <div>
                <input 
                className="register-inputs"
                placeholder="Enter last name..."
                type="text"
                id="last-name"
                name="last-name"
                onChange={(e) => setUserData({...userData, lastName: e.target.value})}/>
            </div>

            <div>
            <select onChange={(e) => setUserData({...userData, gender: e.target.value})}
            id="gender"
            name="gender"
            value={userData.gender}
            className="register-gender">
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='undefined'>Undefined</option>
            </select>
        </div>

        <div>
            <input
            placeholder="Your email..."
            className="register-inputs" 
            type="email"
            id="email"
            name="email"
            onChange={(e) => setUserData({...userData, email: e.target.value})}/>
        </div>

        <div>
            <input 
            className="register-inputs"
            placeholder="Your password..."
            type="password"
            id="password"
            name="password"
            onChange={(e) => setUserData({...userData, password: e.target.value})}/>
        </div>

        <button type="submit" className="register-recap-btn">Register Now</button>
        </form>
        <div className="register-image-div">
            <img src={HomeImage} className="home-image register-image"/>
        </div>
    </div>
  )
}

export default Register

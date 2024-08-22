import { useNavigate } from "react-router-dom"
import HomeImage from '../home-image.jpg'

const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleRegister = () => {
      if (token) {
        navigate('/home/timeline')
      } else {
      navigate('/register')
      }
    }

    const handleLogin = () => {
      if (token) {
        navigate('/home/timeline')
      } else {
      navigate('/login')
      }
    }

  return (
    <div className="home">
      <div className="home-image-div">
        <img src={HomeImage} alt="home" className="home-image"/>
      </div>
    <div className="welcome-div">
      <h2 className="welcome-title">Things Are Happening</h2>
      <div className="welcome-btns">
        <div className="join-div">
      <h4 className="join-title">Join the Club</h4>
        <button onClick={handleRegister} className="create-btn">Create Account</button>
        </div>
        <div className="connected-div">
        <h4 className="connected-title">Already Have an Account?</h4>
        <button onClick={handleLogin} className="connected-btn">Sign In</button>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Home

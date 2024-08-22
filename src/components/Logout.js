import { useNavigate } from "react-router-dom"


const Logout = (props) => {
  const { modal, setModal } = props
    const navigate = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('feelersName')
        localStorage.removeItem('feelersEmail')
        alert('logged out successfully')
        navigate('/')
      }

      const toggleModal = () => {
        setModal(!modal)
      }

  return (
    <div className="new-post-div">
      <h2 className="title">Are you sure you wanna log out? </h2>

      <div>
        <button className="btn edit-one" onClick={handleLogout}>Yes, I wanna logout now</button>
        <button className="btn edit-three" onClick={toggleModal}>No, i would like to go back</button>
      </div>
    </div>
  )
}

export default Logout

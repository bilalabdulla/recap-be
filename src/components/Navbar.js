import { Outlet, useNavigate } from "react-router-dom"
import ActiveUsers from "./ActiveUsers"
import { useContext, useEffect, useState } from "react"
import NewPost from '../pages/NewPost'
import { PostContext } from "../contexts/PostContext"


const Navbar = () => {
    const { fetchCurrentUser, currentUser } = useContext(PostContext)
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
      setModal(!modal)
    }

    if (modal) {
    document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

    useEffect(() => {
      fetchCurrentUser()
    }, [])

  return (
    <div className="navbar-div">

    <section className="navbar-left">

      <div className="logo-div">
      <i class="fa-regular fa-registered logo-icon"></i>
      <h1 className="logo">Recap</h1>
        </div>

        <button className="nav-btn" onClick={() => navigate('/home/timeline')}>
        <span class="material-symbols-outlined icon">home</span>
            Home
          </button>

      <button className="nav-btn">
      <span class="material-symbols-outlined icon">search</span>
        Search
        </button>

        <button className="nav-btn">
        <span class="material-symbols-outlined icon">notifications</span>
          Notifications
        </button>

      <button className="nav-btn" onClick={() => navigate(`/home/messages`)}>
      <span class="material-symbols-outlined icon">mail</span>
        Messages
        </button>

      <button className="nav-btn" onClick={() => navigate(`/home/users/${userId}`)}>
      <span class="material-symbols-outlined icon">person</span>
        Profile
        </button>

        <button className="nav-btn" onClick={() => navigate('/home/users')}>
        <span class="material-symbols-outlined icon">group</span>
        community
        </button>

        <button className="nav-btn">
        <span class="material-symbols-outlined">info</span>
          Help
        </button>

        <button className="nav-btn">
        <span class="material-symbols-outlined icon">contact_support</span>
          Contact us
        </button>

      <button className="nav-btn" onClick={() => navigate('/home/settings')}>
      <span class="material-symbols-outlined icon">settings</span>
        Settings
        </button>

        <button className="nav-btn">
        <span class="material-symbols-outlined icon">page_control</span>
          More
        </button>

      <button className="btn" onClick={toggleModal}
        >Post</button>

    </section>

      <main className="main">
        <Outlet />
      </main>

      <section className="navbar-right">
        <div className="current-user-details">
        <img src={`http://localhost:9000/images/${currentUser?.user?.pfp}`} 
        className="tl-profile-pic"/>
        <div>
        <h3>{currentUser?.user?.firstName}</h3>
        <p>{currentUser?.user?.email}</p>
        </div>
        </div>
        <ActiveUsers />
      </section>

      { modal && (

      <div className="modal">
        <div className="overlay"
        onClick={toggleModal}></div>
        <button onClick={toggleModal}>X</button>
        <div className="modal-content">
          <NewPost modal={modal}
          setModal={setModal}/>
        </div>
      </div>
  )
}
    </div>
  )
}

export default Navbar

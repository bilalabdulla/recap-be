import axios from "axios"
import FormData from "form-data"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PostContext } from "../contexts/PostContext"
import HeaderUpdate from "./HeaderUpdate"


const UpdateUser = () => {
    const userId = localStorage.getItem('userId')
    const [file, setFile] = useState()
    const [avi, setAvi] = useState()
    const { fetchCurrentUser, currentUser, fetchCurrentUserHeader, currentUserHeader } = useContext(PostContext)
    const [modal, setModal] = useState(false)
    const [ newModal, setNewModal ] = useState(false)
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pfp: '',
        header: '',
        bio: ''
        })

    const token = localStorage.getItem('token')
    const localData = localStorage.getItem('userId')

    const handleUpload = async (e) => {
        const formData = new FormData()
        formData.append('file', file)
        try {
            const response = await axios.patch(
                `https://recap-server-k01u.onrender.com/api/v1/users/${localData}`,
                formData,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('image uploaded', response.data);
            alert('Profile picture Updated')
        } catch (error) {
            console.error('failed uploading', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(
                `https://recap-server-k01u.onrender.com/api/v1/users/${localData}`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('User updated', response.data);
            navigate(-1)
        } catch (error) {
            console.error('Error updating user', error);
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    useEffect(() => {
        fetchCurrentUserHeader()
    }, [])

    const toggleModal = () => {
        setModal(!modal)
    }
    const toggleNewModal = () => {
        setNewModal(!newModal)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prevState => ({
            ...prevState,
            [name]: value 
        }))
    }
  return (
    <div className="update-user-div">

        <div className="header-image-div">
        {
            (currentUserHeader?.profile?.avi) ? <img src={`https://recap-server-k01u.onrender.com/images/${currentUserHeader?.profile?.avi}`} onClick={toggleModal}
            className="header-image"/> 
            : <img src={`https://recap-server-k01u.onrender.com/images/cropped-header.png`}  className="header-image" onClick={toggleNewModal}/>
        }
        {
            modal && <div>
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <HeaderUpdate modal={modal} setModal={setModal} userId= {userId}/>
                            <button onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        }
        {
            newModal && <div>
            <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <HeaderUpdate modal={newModal} setModal={setNewModal} userId= {userId}/>
                        <button onClick={toggleNewModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        }
        <h4 className="header-image-text">Update your Header</h4>
        </div>

        <div className="update-user-main">
        <label htmlFor='image-upload' className="image-btn">
        <img src={`https://recap-server-k01u.onrender.com/images/${currentUser?.user?.pfp}`} 
        className="tl-profile-pic"/>
        </label>
        <input className="image-dis"
        type="file" id="image-upload"
        onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload} className="btn edit-one">Update Profile picture</button>
        </div>

    <form onSubmit={handleSubmit} className="form">

        <input className="register-inputs"
        type="text"
        id="first-name"
        name="first-name"
        placeholder="Your First name here..."
        value={userData.firstName}
        onChange={(e) => setUserData({ ...userData, firstName: e.target.value
        })}
        required/>

        <input className="register-inputs"
        type="text"
        placeholder="Your Last name here..."
        id="last-name"
        name="last-name"
        value={userData.lastName}
        onChange={(e) => setUserData({...userData, lastName: e.target.value})}
        required/>

        <input className="register-inputs"
        type="text"
        placeholder="Enter your email..."
        id="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required/>

        <textarea className="register-inputs bio"
        type="text"
        placeholder="Add a bio..."
        id='bio'
        name="bio"
        value={userData.bio}
        onChange={handleChange}
        required />

        <button  className="btn edit-one" type="submit">Save Changes</button>
    </form>
    </div>
  )
}

export default UpdateUser

import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


const DeleteUser = (props) => {
    const navigate = useNavigate()
    const { modal, setModal } = props 

    const token = localStorage.getItem('token')
    const localData = localStorage.getItem('userId')

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:9000/api/v1/users/${localData}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('User Deleted: ', response.data);
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
        try {
            const response = await axios.delete(
                `http://localhost:9000/api/v1/posts/userposts/${localData}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('posts Deleted', response.data)
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            setModal(!modal)
            navigate('/')
        } catch (error) {
            console.error('error deleting user posts', error);
            setModal(!modal)
        }
    }

    const toggleModal = () => {
        setModal(!modal)
    }

  return (
    <div className="new-post-div">
      <h2 className="delete-title">Are you sure You wanna Delete this Account?</h2>
      <p className="delete-warning"><span>Warning: </span>This is permanent and cannot be reversed!</p>
      <button className="btn edit-one edit-four" onClick={handleDelete}>Delete now</button>
      <button className="btn edit-three edit-four" onClick={toggleModal}>No, I would like to go back</button>
    </div>
  )
}

export default DeleteUser

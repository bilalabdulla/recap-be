import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const DeletePost = (props) => {
    // const { postId } = useParams()
    const { postId, userId, modal, setModal } = props
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `https://recap-server-k01u.onrender.com/api/v1/posts/${postId}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log("post deleted: ", response.data);
            setModal(!modal)
        } catch (error) {
            console.error('Error deleting post', error);
            setModal(!modal)
        }
    }
    const toggleModal = () => {
        setModal(!modal)
    }

  return (
    <div className="new-post-div">
        <h4 className="delete-post-title">Are you sure you wanna delete this post?</h4>
      <button className="delete-btns" onClick={handleDelete}>Delete now</button>
      <button className="delete-btns go-back" onClick={toggleModal}>No, Go back</button>
    </div>
  )
}

export default DeletePost

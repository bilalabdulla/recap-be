import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostContext } from "../contexts/PostContext"

const TimelineSinglePost = (props) => {

  const localUser = localStorage.getItem('userId')
  const likeRef = useRef()
  const { postId, title, content, userId, image, createdAt } = props 
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [user, setUser] = useState({})
    const [totalLikes, setTotalLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(true)
    const [likes, setLikes] = useState()
    const [likeData, setLikeData] = useState({
      userId: localUser,
      postId: postId
    })

    useEffect(() => {
      const fetchUser = async () => {
      try {
          const response = await axios.get(
            `https://recap-server-k01u.onrender.com/api/v1/users/${userId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          setUser(response.data)
          console.log('user: ', user);
        } catch (error) {
          console.error('Error fetching users', error);
        }
      }
      fetchUser()
    }, [])

    useEffect(() => {
      const fetchLikes = async () => {
        try {
          const response = await axios.get(
            `https://recap-server-k01u.onrender.com/api/v1/${postId}/likes`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          setTotalLikes(response.data)
          console.log('likes: ', response.data);
        } catch (error) {
          console.error('error liking', error);
        }
      }
      fetchLikes()
    }, [isLiked])

    const handleLike = async () => {
            try {
                const response = await axios.post(
                  `https://recap-server-k01u.onrender.com/api/v1/${postId}/likes`,
                  likeData,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                  }
                )
                console.log('likes added', response.data);
                setIsLiked(!isLiked)
          } catch (error) {
            console.error('error liking', error);
          }
    }

  return (
    <div className="tl-list">
      {
        (user?.user?._id === userId) && <div className="tl-profile"> 
        <img src={`https://recap-server-k01u.onrender.com/images/${user?.user?.pfp}`}  alt="" className="small-pic"/>  
        <button 
        onClick={() => navigate(`/home/users/${userId}`)} 
        className="tl-user">{user?.user?.firstName}</button>
              <p className="tl-time">{createdAt.split('T')[1].split('.')[0]}</p>
        </div>
      }
      <div onClick={() => navigate(`/home/${postId}`)} className="tl-card">
      <h2 className="tl-title">{title}</h2>
      <p className="tl-content">{content}</p>
      <img src={'https://recap-server-k01u.onrender.com/images/'+image} alt="" className="tl-image"/>
      <p className="tl-date">{createdAt.split('T')[0]}</p>
      </div>
      <div className="interaction">
        <div className="like">
      <button onClick={handleLike}>
      <span class="material-symbols-outlined" ref={likeRef}>favorite</span>
      </button>
        <p>{totalLikes}</p>
      </div>
      <button onClick={() => navigate(`/home/${postId}`)}>
      <span class="material-symbols-outlined">comment</span>
      </button>
      </div>
    </div>
  )
}

export default TimelineSinglePost

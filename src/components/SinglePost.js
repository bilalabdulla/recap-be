import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CreateComment from "./CreateComment"
import ShowComments from "./ShowComments"
import DeletePost from "./DeletePost"
import { PostContext } from "../contexts/PostContext"


const SinglePost = () => {

    const { fetchCurrentUser, currentUser } = useContext(PostContext)
    const { postId } = useParams()
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const [singlePost, setSinglePost] = useState({})
    const [allComments, setAllComments ] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:9000/api/v1/posts/${postId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setSinglePost(response.data)
                console.log('Post: ', response.data.post)
            } catch (error) {
                console.error("Error Fetching Post: ", error)
            }
        }
        fetchSinglePost()
    }, [])

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:9000/api/v1/comments/${postId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setAllComments(response.data)
                console.log('comments: ', response.data)
            } catch (error) {
                console.error('error fetching comments', error);
            }
        }
        fetchComments()
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:9000/api/v1/users/${singlePost?.post?.createdBy}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setUser(response.data)
                console.log('User fetched', response.data);
            } catch (error) {
                console.error('Error fetching user', error);
            }
        }
        fetchUser()
    }, [singlePost])
    
    useEffect(() => {
        fetchCurrentUser()
    }, [])

    console.log('singlepost', singlePost);

  return (
    <div className="single-post-top-main">
        <div className="single-post-head">
            <button onClick={() => navigate(-1)}>
            <i class="fa-solid fa-arrow-left"></i>
            </button>
            <h3>Post</h3>
        </div>
        <div className="single-post-user">
        <img src={`http://localhost:9000/images/${user?.user?.pfp}`} 
        className="tl-profile-pic"/>
        <div className="post-user-details">
        <h2>{user?.user?.firstName}</h2>
        <h4>{user?.user?.email}</h4>
        </div>
        </div>
        <div className="post-card">
      <h2 className="post-title">{singlePost.post?.title}</h2>
      <h4 className="post-content">{singlePost.post?.content}</h4>
       </div>

       <div className="reply-div">
      <img src={`http://localhost:9000/images/${currentUser?.user?.pfp}`} 
        alt="" className="tl-profile-pic reply-image"/>
      <CreateComment postId={singlePost.post?._id}/>
      </div>

      <ul className="comments-list">
        {
            allComments?.comments?.map((comment) => {
                return <ShowComments key={comment._id}
                content={comment.content}
                commentId={comment._id}/>
            })
        }
      </ul>
      {
        // (singlePost.post?.createdBy === userId) ? <DeletePost /> : ''
      }
    </div>
  )
}

export default SinglePost

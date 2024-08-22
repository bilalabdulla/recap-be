import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FollowUser from "./FollowUser"
import SingleUserPosts from "./SingleUserPosts"
import { PostContext } from "../contexts/PostContext"
import UpdateUser from "./UpdateUser"


const SingleUser = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const localUser = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const [photo, setPhoto] = useState()
    const [isClicked, setIsClicked] = useState(false)

    const { fetchAllFollowers,
       fetchAllFollowing,
      followingCount, followerCount } = useContext(PostContext)

    const [singleUser, setSingleUser] = useState({})
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        const fetchSingleUser = async () => {
            try {
                const response = await axios.get(
                    `https://recap-server-k01u.onrender.com/api/v1/users/${userId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setSingleUser(response.data)
            } catch (error) {
                console.error('error fetching user', error);
            }
        }
        fetchSingleUser()
    }, [])


    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            `https://recap-server-k01u.onrender.com/api/v1/posts/userposts/${userId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          setUserPosts(response.data)
          console.log('User posts: ', response.data);
        } catch (error) {
          console.error('error fetching posts', error);
        }
      }
      fetchPosts()
    }, [])

    useEffect(() => {
      const fetchHeader = async () => {
        try {
          const response = await axios.get(
            `https://recap-server-k01u.onrender.com/api/v1/profile/${userId}`,
            {
              headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          setPhoto(response.data?.profile?.avi)
          console.log('header: ', response.data.profile.avi);
        } catch (error) {
          console.error('error fetching header', error);
        }
      }
      fetchHeader()
    }, [])

    useEffect(() => {
      fetchAllFollowers(userId)
    }, [isClicked])

    useEffect(( ) => {
      fetchAllFollowing(userId)
    }, [])

  return (
    <div>
    <div className="">
      <div className="post-length">
        <h4>{singleUser?.user?.firstName}</h4>
        <p>{userPosts?.posts?.length} Posts total</p>
        </div>
        <div className="profile-pics">
      { (photo) ? <img className="header" src={`https://recap-server-k01u.onrender.com/images/${photo}`} alt="" />
          : <img className="header" src={`https://recap-server-k01u.onrender.com/images/cropped-header.png`} alt="" />}
                <img className="profile-pic" src={`https://recap-server-k01u.onrender.com/images/${singleUser?.user?.pfp}` } alt='image' />
          </div>

          <div className="details-follow">
      <div className="user-details">
        <h2 className="user-title">{singleUser?.user?.firstName}</h2>
        <p className="user-email">{singleUser?.user?.email}</p>
        <p className="user-email">member since: {singleUser?.user?.createdAt.split('T')[0]}</p>
       </div>
       {
        (userId === localUser) ? <button
        className="details-follow-btn" onClick={() => navigate('/home/updateuser')}>Update Profile</button> 
        : <FollowUser isClicked={isClicked} setIsClicked={setIsClicked}/>
      }
       </div>

       <div className="follow-details">
      <button onClick={() => navigate('following')}>
        <span>{followingCount}</span>
        <p>Following</p>
        </button>
      <button onClick={() => navigate('followers')}>
        <span>{followerCount}</span>
        <p>Followers</p>
        </button>
      </div>
      <p className="bio-text">{singleUser?.user?.bio}</p>

      </div>

      <ul className="profile-main">
        <ul className="main-head">
          <li className="main-posts">Posts</li>
          <li className="main-comments">Comments</li>
          <li className="main-likes">Likes</li>
        </ul>
        <ul className="user-main-posts">
        {
          userPosts?.posts?.map((post) => {
          return  <SingleUserPosts 
            postId={post._id}
            key={post._id}
            title={post.title}
            content={post.content}
            image={post?.image}
            postUser={userId}
            createdAt={post?.createdAt}/>
          })
        }
        </ul>
      </ul>
    </div>
  )
}

export default SingleUser

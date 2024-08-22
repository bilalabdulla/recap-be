import axios from "axios";
import { createContext, useState } from "react";


export const PostContext = createContext()

const PostContextProvider = (props) => {

    const [likes, setLikes] = useState(0)
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)
    const [currentUser, setCurrentUser] = useState()
    const [ currentUserHeader, setCurrentUserHeader ] = useState()
    
    const fetchLikes = async (postId) => {
        try {
                const response = await axios.get(
               `http://localhost:9000/api/v1/posts/${postId}`,
               {
                  headers: {
                     'Content-Type': 'application/json',
                      'Accept': 'application/json',
                     'Authorization': `Bearer ${token}`
                    }
                  }
                )
                 setLikes(response.data.post.likes)
                 console.log('likes: ', response.data);
              } catch (error) {
                console.error('error liking', error);
            }
    }

    const fetchAllFollowers = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:9000/api/v1/follow/${userId}/followers`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setFollowerCount(response.data.followers.length)
            console.log('followers: ', response.data);
            console.log('count followers', followerCount);
        } catch (error) {
            console.error('error fetching followers', error);
        }
    }

    const fetchAllFollowing = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:9000/api/v1/follow/${userId}/following`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setFollowingCount(response.data.followers.length)
            console.log('followings : ', response.data);
            console.log('count following', followingCount);
        } catch (error) {
            console.error('error fetching followings', error);
        }
    }

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(
                `http://localhost:9000/api/v1/users/${userId}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setCurrentUser(response.data)
            console.log('Current user fetched', response.data);
        } catch (error) {
            console.error('Error fetching current user', error)
        }
    }

    const fetchCurrentUserHeader = async () => {
        try {
            const response = await axios.get(
                `http://localhost:9000/api/v1/profile/${userId}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setCurrentUserHeader(response.data)
            console.log('User header fetched', response.data);
        } catch (error) {
            console.error('error fetchig header', error); 
        }
    }

    return (
        <PostContext.Provider value={{ fetchLikes, setLikes, fetchAllFollowers, fetchAllFollowing, fetchCurrentUser, fetchCurrentUserHeader, currentUserHeader, currentUser, followerCount, setFollowerCount, followingCount, setFollowingCount, likes, token }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
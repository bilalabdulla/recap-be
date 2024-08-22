import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const FollowUser = (props) => {

    const { isClicked, setIsClicked } = props 
    const {userId: followerId} = useParams()
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const followerName = localStorage.getItem('feelersName')
    const followerEmail = localStorage.getItem('feelersEmail')
    const [statusCode, setStatusCode] = useState()

    const [followData, setFollowData] = useState({
        userId: userId,
        followerId: followerId
    })

    const [follower, setFollower] = useState({
        userId: userId,
        followerId: followerId,
        followerName: followerName,
        followerEmail: followerEmail 
    })

    useEffect(() => {
        const fetchFollower = async () => {
            try {
                const response = await axios.post(
                    `https://recap-server-k01u.onrender.com/api/v1/follow/new`,
                    followData,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setStatusCode(response.status)
                console.log('Following: ', response.status)
            } catch (error) {
                console.log('Error fetching following', error.response.status)
                setStatusCode(error.response.status)
            }
        }
        fetchFollower()
    }, [])

    const handleFollow = async () => {
        try {
            const response = await axios.post(
                'https://recap-server-k01u.onrender.com/api/v1/follow/',
                follower,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setStatusCode(response.status)
            setIsClicked(!isClicked)
            console.log('follow/unfollow successful', response.status)
        } catch (error) {
            console.error('Error following', error);
        }
    }

    console.log(statusCode);

  return (
    <div className='follow-user-div'>
      { <button onClick={handleFollow} className='follow-user-btn'>
        {(statusCode === 200) ? 'Unfollow' : 'Follow'}
      </button> }
      
    </div>
  )
}

export default FollowUser

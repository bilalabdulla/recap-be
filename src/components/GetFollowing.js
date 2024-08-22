import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const GetFollowing = () => {
    const {userId} = useParams()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [followingList, setFollowingList] = useState([])

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await axios.get(
                    `https://recap-server-k01u.onrender.com/api/v1/follow/${userId}/following`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setFollowingList(response.data)
                console.log('Following: ', response.data)
            } catch (error) {
                console.error('Error fetching following', error)
            }
        }
        fetchFollowing()
    }, [])

  return (
    <div className=''>
        <ul className="follow-ul">
        <button onClick={() => navigate(-1) }>
        <i class="fa-solid fa-arrow-left"></i>
        </button>
        <li className="followers-li">Followers</li>
        <li>Following</li>
      </ul>
      {
        followingList?.followers?.map((follower) => {
            return <div className='follow-items'>
                {
                    (!follower.followerName) ? <h4 className='follow-email'>{follower.followerId}</h4>
                    : <div>
                        <p className='follow-name'>{follower?.followerName}</p>
                        <p className='follow-email'>{follower?.followerEmail}</p>
                    </div>
                }
             </div>
        })
      }
    </div>
  )
}

export default GetFollowing

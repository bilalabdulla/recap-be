import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const GetFollowers = () => {
    const { userId } = useParams()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [followersList, setFollowers] = useState([])
    const [user, setUser] = useState()

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:9000/api/v1/users/${userId}`,
    //                 {
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'Authorization': `Bearer ${token}`
    //                     }
    //                 }
    //             )
    //             setUser(response.data)
    //             console.log('User fetched', response.data);
    //         } catch (error) {
    //             console.error('error fetching user', error);
    //         }
    //     }
    //     fetchUsers()
    // }, [])

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:9000/api/v1/follow/${userId}/followers`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setFollowers(response.data)
                console.log('followers: ', response.data);
            } catch (error) {
                console.error('Error fetching followers', error);
            }
        }
        fetchFollowers()
    }, [])

  return (
    <div className="">
      <ul className="follow-ul">
        <button onClick={() => navigate(-1) }>
        <i class="fa-solid fa-arrow-left"></i>
        </button>
        <li className="followers-li">Followers</li>
        <li>Following</li>
      </ul>
      {
        followersList?.followers?.map((follower) => {
            return <div className="follow-items"> 
            {
                (!follower.followerName) ? <h4 className="follow-email">{follower.userId}</h4>
                : <div> 
                    <h3 className="follow-name">{follower?.followerName}</h3>
                    <h4 className="follow-email">{follower?.followerEmail}</h4>
                  </div>  
            }

            <h4></h4>
            </div>
        })
      }
    </div>
  )
}

export default GetFollowers

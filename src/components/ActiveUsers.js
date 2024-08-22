import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ActiveUsers = () => {
    const token = localStorage.getItem('token')
    const [users, setUsers] = useState([])
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    'https://recap-server-k01u.onrender.com/api/v1/users',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setUsers(response.data.users)
                console.log('users: ', response.data.users);
            } catch (error) {
                console.error('error fetching users', error);
            }
        }
        fetchUsers()
    }, [])

  return (
    <div className='active-users'>
        {
            users?.map((user) => {
                if (user._id !== userId ) {
                    return <div className="active-items" key={user._id} 
                    onClick={() => navigate(`/home/users/${user._id}/chats`)}> 
                    <img src={`https://recap-server-k01u.onrender.com/images/${user.pfp}`} alt=""
                    className="tl-profile-pic"/>
                    <div className="tl-details">
                    <h4 className="user-name-text">{user.firstName}</h4>
                    <p className="user-email-text">{user.email}</p>
                    </div>
                </div>
                }
                
            })
        }
      <h4>name</h4>
      <p>Email</p>
    </div>
  )
}

export default ActiveUsers

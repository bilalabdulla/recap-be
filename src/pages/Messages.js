import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const Messages = () => {

    const [messages, setMessages] = useState([])
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`https://recap-server-k01u.onrender.com/api/v1/chats/send/${userId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setMessages(response.data)
                console.log('messages fetched', response.data);
            } catch (error) {
                console.error('error fetching messages', error);
            }
        }
        fetchMessages()
    }, [])

  return (
    <div className="messages-main">
        <h2 className="messages-title">Your Messages</h2>
      {
        messages?.convo?.map((conversation) => {
            return conversation?.participants?.map((convo) => {
                if (convo._id !== userId) {
                    return <div key={convo._id} className="active-items messages"
                        onClick={() => navigate(`/home/users/${convo._id}/chats`)}> 
                        <img src={`https://recap-server-k01u.onrender.com/images/${convo.pfp}`} 
                        className="tl-profile-pic"/>
                        <div className="tl-details">
                        <p className="user-name-text">{convo.firstName}</p>
                        <p className="user-email-text">{convo.email}</p>
                        </div>
                        </div>
                }
            })
        })
      }
    </div>
  )
}

export default Messages

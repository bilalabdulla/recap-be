import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CreateChat from "../components/CreateChat"


const Chat = () => {
    const [chat, setChat] = useState()
    const { userId: receiverId } = useParams()
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const [receiver, setReceiver ] = useState()
    const [isClicked, setIsClicked ] = useState(false)

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:9000/api/v1/chats/${receiverId}`,
                     {
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setChat(response.data)
                console.log('chat fetched', response.data);
            } catch (error) {
                console.error('error fetching chats', error);                
            }
        }
        fetchChats()
    }, [receiverId, isClicked])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:9000/api/v1/users/${receiverId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setReceiver(response.data)
                console.log('fetched receiver', response.data);
            } catch (error) {
                console.error('error fetching receiver', error);
            }
        }
        fetchUser()
    }, [receiverId])

  return (
    <div className="chat-main">
        <div className="receiver-details">
        <img src={`http://localhost:9000/images/${receiver?.user?.pfp}`} 
        className="tl-profile-pic"/>
        <p>{receiver?.user?.firstName}</p>
        </div>
      {
        chat?.map((chat) => {
            return <div className="chats" key={chat._id}>
                {/* <p>{chat?.senderId}</p> */}
                <p className={(chat?.senderId === userId) ? 'sender' : 'receiver'}>{chat?.text}</p>
             </div>
        })
    }
      <CreateChat token={token} isClicked={isClicked}
      setIsClicked={setIsClicked}/>
    </div>
  )
}

export default Chat

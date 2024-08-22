import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"


const CreateChat = (props) => {
    const { token, isClicked, setIsClicked } = props
    const [chat, setChat] = useState('')
    const { userId: receiverId } = useParams()
    const chatData = { text: chat, receiverId: receiverId }

    const handleChat = async () => {
        try {
            const response = await axios.post(
                `https://recap-server-k01u.onrender.com/api/v1/chats`,
                chatData,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('chat created', response.data);
            setIsClicked(!isClicked)
            setChat('')
        } catch (error) {
            console.error('error creating chat', error);
        }
    }

  return (
    <div className="create-chat-div">
      <input type="text" value={chat} 
      className="chat-input"
      placeholder="start a new message..."
      onChange={(e) => setChat(e.target.value)} />
      <button onClick={handleChat}
      className="chat-btn">
        <i class="fa-solid fa-reply"></i>
      </button>
    </div>
  )
}

export default CreateChat

import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const CreateComment = (props) => {

    const { postId } = props
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [comment, setComment] = useState({
        content: '',
        commentedOn: postId,
        commentedBy: userId
    })

    const handleSubmit = async (e) => {
        // e.preventDefault()
        try {
            const response = await axios.post(
                `https://recap-server-k01u.onrender.com/api/v1/comments/${postId}`,
                comment,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log("comment created", response.data);
            navigate(`/home/${postId}`)
        } catch (error) {
            console.error('error creating comment', error);
        }
    }

  return (
        <form onSubmit={handleSubmit} className='reply-form'>

            <textarea className='reply'
            type='text'
            placeholder='Post your reply'
            id='comment'
            name='comment'
            value={comment.content}
            onChange={(e) => setComment({...comment, content: e.target.value })}/>

            <button className='reply-btn' type='submit'>Reply</button>
        </form>
  )
}

export default CreateComment

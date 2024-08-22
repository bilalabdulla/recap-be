import axios from "axios"
import FormData from "form-data"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, Container, makeStyles, TextField, Typography } from '@mui/material'
import { PostContext } from "../contexts/PostContext"


const NewPost = (props) => {
    const { modal, setModal } = props
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const { fetchCurrentUser, currentUser } = useContext(PostContext)

    const [postData, setPostData] = useState({
        title: '',
        content: '',
        createdBy: userId
    })
    const [photo, setPhoto] = useState()


    const token = localStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', photo)
        let response
        try {
            response = await axios.post(
                `http://localhost:9000/api/v1/posts`,
                postData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            console.log('Post created: ', response.data.posts._id);
        } catch (error) {
            console.error('Error creating Post: ', error);
        }
        try {
            const pfpresponse = await axios.patch(
                `http://localhost:9000/api/v1/posts/${response?.data?.posts?._id}/update`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('post updated',pfpresponse.data);
            setModal(!modal)
            navigate('/home/timeline')
        } catch (error) {
            console.error('error updating', error);
            setModal(!modal)
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setPostData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


  return (
    <div className="new-post-div">
        <form onSubmit={handleSubmit} className="new-post-form">

            <div className="new-post-main">
            <img src={`http://localhost:9000/images/${currentUser?.user?.pfp}`} 
            className="tl-profile-pic"/>

            <div className="new-post-inputs">
            <input 
            className="new-post-title"
            placeholder="Enter your title"
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}/>

            <textarea
            className="new-post-content"
            id="content"
            placeholder="Whats on your mind"
            name="content"
            value={postData.content}
            onChange={handleChange}>
            </textarea>

            <label className="image-btn new-post-upload" htmlFor="post-image">
            <i class="fa-regular fa-image"></i>
            </label>
            <input 
             type="file"
             id="post-image" 
             className="image-dis"
             onChange={(e) => setPhoto(e.target.files[0])}/>

            
            <button type="submit" className="new-post-btn">submit</button>
            </div>
            </div>

        </form>
        <div>

        </div>
    </div>
  )
}

export default NewPost

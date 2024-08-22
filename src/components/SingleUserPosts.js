import React, { useRef, useState } from 'react'
import DeletePost from './DeletePost'

const SingleUserPosts = (props) => {
    const { postId, title, content,
      createdAt, postUser, image } = props 
    const deletebtn = useRef()
    console.log('postid', postId);
    const userId = localStorage.getItem('userId')
    const [modal, setModal] = useState(false)

    if (modal) {
      document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

    const toggleModal = () => {
      setModal(!modal)
    }

  return (
    <div className='tl-list'>
      <div className='tl-card'>
      <p className='user-time'>{createdAt.split('T')[1].split('.')[0]}</p>
      <h3 className='tl-title'>{title}</h3>
      <h4 className='tl-content edit-six'>{content}</h4>
      <img src={`http://localhost:9000/images/${image}`} 
      alt='' className='tl-image'/>
      <p className='tl-date'>{createdAt.split('T')[0]}</p>
      </div>
      {
         (userId && userId === postUser ) && <button onClick={toggleModal}
         className='delete-post-btn'>
          <i class="fa-solid fa-trash trash-icon"></i>
          Delete Post</button>
      }
      {
        modal && (
          <div className='modal'>
            <div className='overlay' onClick={toggleModal}>
              <button onClick={toggleModal}>X</button>
              <div className='modal-content'>
                    <DeletePost 
                    modal={modal} setModal={setModal}
                    postId={postId} userId={userId}/>
              </div>
            </div>

          </div>
        )
      }
      { 
        // (userId && userId === postUser) ? <DeletePost postId={postId} userId={userId}/> : ''
      }
    </div>
  )
}

export default SingleUserPosts

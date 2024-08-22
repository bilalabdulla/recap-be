import { useState } from "react"
import FormData from "form-data"
import axios from "axios"


const HeaderUpdate = (props) => {

    const { userId, modal, setModal } = props 
    const token = localStorage.getItem('token')
    const [avi, setAvi ] = useState() 

    const handleheaderUpdate = async () => {
        const formData = new FormData()
        formData.append('file', avi)
        try {
            const response = await axios.patch(
                `http://localhost:9000/api/v1/profile/${userId}`,
                formData,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('header uploaded', response.data);
            alert('Header updated')
            toggleModal()
            
        } catch (error) {
            console.error('error uploading header', error);
            toggleModal()
        }
    }
    
    const toggleModal = () => {
        setModal(!modal)
    }

  return (
    <div className="new-post-div">
        <button onClick={toggleModal}>X</button>
        <h4 className="header-update-title">Upload a new Header</h4>
    <label htmlFor='image-upload' className="image-btn">
        <i class="fa-solid fa-image"></i>
    </label>
      <input id="image-upload" className="image-dis" 
      type="file" onChange={(e) => setAvi(e.target.files[0])} />
      <button onClick={handleheaderUpdate} className="btn">Confirm</button>
    </div>
  )
}

export default HeaderUpdate

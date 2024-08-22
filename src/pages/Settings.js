import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logout from "../components/Logout"
import DeleteUser from "../components/DeleteUser"

const Settings = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [newModal, setNewModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const toggleNewModal = () => {
      setNewModal(!newModal)
    }

  return (
    <div className="settings-div">
      <h4 className="settings-title">settings</h4>
      <ul className="settings-ul">
        <li onClick={toggleModal}>Logout from Recap</li>
        <li onClick={toggleNewModal}>Delete your Account</li>
        <li>About us</li>
        <li>Help center</li>
      </ul>

      {
        modal && (
            <div className="modal">
                <div className="overlay" onClick={toggleModal}>
                    <div className="modal-content">
                        <Logout modal={modal} setModal={setModal}/>
                    </div>
                </div>
            </div>
        )
      }
      {
        newModal && (
            <div className="modal">
                <div className="overlay" onClick={toggleNewModal}>
                    <div className="modal-content">
                        <DeleteUser modal={newModal} setModal={setNewModal}/>
                    </div>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default Settings

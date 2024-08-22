import { useNavigate } from "react-router-dom"


const TimelineSingleUser = (props) => {
    const { firstName, lastName, email, userId, gender, pfp} = props
    const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/home/users/${props.userId}`)} className="community-list">

      <div className='community-card'>
      <img src={`http://localhost:9000/images/${pfp}`} className="tl-profile-pic"/>
      <div className='tl-details edit-five'>
      <p className='user-name-text'>{firstName} {lastName}</p>
      <h4 className="user-email-text">{email}</h4>
      <p className='user-gender-text'>{gender}</p>
      </div>
      </div>
      {/* <p className="side-text">{userId}</p> */}
    </div>
  )
}

export default TimelineSingleUser

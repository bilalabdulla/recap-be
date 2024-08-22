import axios from "axios"
import { useEffect, useState } from "react"
import TimelineSingleUser from "./TimelineSingleUser"


const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const localData = localStorage.getItem('token')

  useEffect(() => {
    const fetchAllUsers = async (req, res) => {
      try {
        const response = await axios.get(
          'http://localhost:9000/api/v1/users',
          {
            headers: {
              'Accept': 'application/json',
              "Content-Type": 'application/json',
              'Authorization': `Bearer ${localData}`
            }
          }
        )
        setAllUsers(response.data)
        localStorage.setItem('userId', response.data.userId)
        console.log('All users:', response.data);
      } catch (error) {
        console.error('error fetching users', error);
      }
    }
    fetchAllUsers()
  }, [])

  return (
    <div className="community">
      <h4 className="community-title">Our Community</h4>
      <ul className="community-ul">
      {
        allUsers?.users?.map((user) => {
          return <TimelineSingleUser  key={user._id}
          email={user.email} userId={user._id}
          firstName={user.firstName} lastName={user.lastName}
          gender={user.gender} pfp={user.pfp}/>
        })
      }
      </ul>
    </div>
  )
}

export default AllUsers

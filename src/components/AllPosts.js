import axios from "axios"
import { useEffect, useState } from "react"
import Timeline from "../pages/Timeline"
import TimelineSinglePost from "./TimelineSinglePost"
import Searchbar from "./Searchbar"


const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    'https://recap-server-k01u.onrender.com/api/v1/posts',
                    {
                        headers: {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setAllPosts(response.data.posts)
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching posts: ', error);
            }
        }
        fetchPosts()
    }, [] )

    console.log('allposts', allPosts);


  return (
    <div className="tl-main">
        <Searchbar />
        <ul className="tl-main-ul">
            <li className="for-you">For you</li>
            <li>Following</li>
        </ul>
        <ul className="timeline-ul">
            {
                allPosts?.map((post) => {
                    return <TimelineSinglePost key={post._id} 
                    title={post.title} content={post.content} 
                    postId={post._id} userId = {post.createdBy} 
                    image = {post.image} createdAt={post.createdAt}/>
                })
            }
        </ul>
    </div>
  )
}

export default AllPosts

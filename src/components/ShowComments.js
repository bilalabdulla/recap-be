import axios from "axios"
import { useEffect, useState } from "react"

const ShowComments = (props) => {
    const { content, commentId } = props

  return (
   <li className="post-comment">
    <p className="comment">{content}</p>
   </li>
  )
}

export default ShowComments

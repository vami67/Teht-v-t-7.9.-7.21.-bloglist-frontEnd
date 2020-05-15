import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, addCommentToBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from "react-router-dom"

const Blog = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const [content, setContent] = useState('')

  const handleLike = async (id) => {
    dispatch(likeBlog(id))
  }

  const handleRemove = async (id) => {
    dispatch(deleteBlog(id))
    history.push('/')
  }

  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)

  if (!blog) {
    return null
  }

  const own = user.username === blog.user.username

  const handleNewComment = (event) => {
    event.preventDefault()
    dispatch(addCommentToBlog(id, { content }))
    setContent('')
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>

      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>

      <form onSubmit={handleNewComment}>
        <input
          id='content'
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        <button id="create">add comment</button>
      </form>

      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>
            {comment.content}
          </li>
        )}
      </ul>

    </div>
  )
}

export default Blog
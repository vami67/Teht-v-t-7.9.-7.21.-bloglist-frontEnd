import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'
import { Link } from "react-router-dom"

const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div>
      {blogs.sort(byLikes).map(blog =>

        <div style={blogStyle} className='blog' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <i>{blog.title}</i> by {blog.author}
          </Link>
        </div>

      )}
    </div>
  )
}

export default Blogs
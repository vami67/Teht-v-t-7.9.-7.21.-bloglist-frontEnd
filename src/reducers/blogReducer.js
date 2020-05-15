import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
const blogReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    case 'LIKE_BLOG':
      const blogToLike = state.find(b => b.id === action.data.id)
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
      blogService.update(likedBlog)
      return state.map(b => b.id === blogToLike.id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b)
    case 'ADD_COMMENT_TO_BLOG':
      const blogToComment = state.find(b => b.id === action.data.id)
      const commentedBlog = [...blogToComment.comments, action.data.newComment]
      return state.map(b => b.id === action.data.id ? { ...blogToComment, comments: commentedBlog } : b)
    default:
      return state
  }

}

export const initBlogs = () => {
  return async dispatch => {
    const blogsArray = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogsArray
    })
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    dispatch({
      type: 'LIKE_BLOG',
      data: {
        id
      }
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id
      }
    })
  }

}

export const addCommentToBlog = (id, commentObject) => {
  return async dispatch => {
    const newComment = await blogService.createCommentToBlog(id, commentObject)
    dispatch({
      type: 'ADD_COMMENT_TO_BLOG',
      data: {
        id,
        newComment
      }
    })
  }
}

export const addBlog = (blogObject) => {
  return async dispatch => {
    try {
      const newBlogObject = await blogService.create(blogObject)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlogObject
      })
      const notificationObject = {
        message: `a new blog '${newBlogObject.title}' by ${newBlogObject.author} added!`,
        type: 'success'
      }
      dispatch(setNotification(notificationObject, 5))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export default blogReducer
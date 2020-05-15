import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import Blogs from './components/Blogs'
import Blog from './components/Blog'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Navigation from './components/Navigation'

import { addBlog } from './reducers/blogReducer'
import { initUser} from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const createBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blog))
  }
 
  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification notification={notification} />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <Navigation />
      <h2>blogs</h2>
      <Notification notification={notification} />

      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users/:id">
          
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <Blogs />
        </Route>
      </Switch>

    </Router>
  )
}

export default App
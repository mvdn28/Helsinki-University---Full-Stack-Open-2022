import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    const fetch = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser')
      if (loggedUserJSON) {
        const user = await JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
        const blogs = await blogService.getAll()
        blogs.sort((a,b)=> b.likes - a.likes)
        setBlogs(blogs)
      }
    }
    fetch()
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogFormRef = useRef()

  const addBlog = async(blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(blogObject))
      setErrorMessage(
        `a new blog: ${blog.title} by ${blog.author}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Blog with problem')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const modifyBlog = async(blogObject) => {
    try {
      const blog = await blogService.modifyBlog(blogObject)
      const editedBlogs = await blogService.getAll()
      setBlogs(editedBlogs)
      setErrorMessage(
        `a new like in blog: ${blog.title} by ${blog.author}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Like not processed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async(blogToDelete) => {
    try {
      window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`) &&
        await blogService.deleteBlog(blogToDelete.id)
      const currentBlogs = await blogService.getAll()
      setBlogs(currentBlogs)
      setErrorMessage(
        `a deleted blog: ${blogToDelete.title} by ${blogToDelete.author}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Blog not deleted')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null ?
      <div>
        <h2> log in to application</h2>
        <Notification message={errorMessage} state={'error'} />
        {loginForm()} 
      </div> :
      <div>
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} state={'success'}/>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        </div>
        <div>
          <h2>create new</h2>
          <Togglable buttonLabel='create blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
        </div>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} editBlog={modifyBlog} deleteBlog={deleteBlog} user={user}/>
          )}
        </div>
      </div>
      }    
    </div>
  )
}

export default App

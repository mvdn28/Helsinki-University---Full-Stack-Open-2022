import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    const fetch = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser')
      if (loggedUserJSON) {
        const user = await JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
        const blogs = await blogService.getAll()
        console.log(blogs)
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

  const handleCreate = async(event) => {
    event.preventDefault()
    try {
      const blog = await blogService.createBlog({
        title,author,url
      })
      setBlogs(blogs.concat(blog))
      setErrorMessage(
        `a new blog: ${blog.title} by ${blog.author}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (exception) {
      setErrorMessage('Blog with problem')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createNewForm = () => (
    <form onSubmit={handleCreate}>
      <div>
        title: 
        <input type="text" value={title} name="Title" onChange={({target}) => setTitle(target.value)}/>
      </div>
      <div>
        author: 
        <input type="text" value={author} name="Author" onChange={({target}) => setAuthor(target.value)}/>
      </div>
      <div>
        url: 
        <input type="text" value={url} name="Url" onChange={({target}) => setUrl(target.value)}/>
      </div>
      <button type='submit'>create</button>
    </form>
  )


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
          {createNewForm()}
        </div>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
      }    
    </div>
  )
}

export default App

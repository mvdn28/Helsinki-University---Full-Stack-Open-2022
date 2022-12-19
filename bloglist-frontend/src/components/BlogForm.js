import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const addBlog = () => {

    createBlog({
      title,author,url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        title:
        <input type="text" value={title} name="Title" id='form-title' onChange={handleTitleChange}/>
      </div>
      <div>
        author:
        <input type="text" value={author} name="Author" id='form-author' onChange={handleAuthorChange}/>
      </div>
      <div>
        url:
        <input type="text" value={url} name="Url" id='form-url' onChange={handleUrlChange}/>
      </div>
      <button type='submit' id='form-create'>create</button>
    </form>
  )
}
export default BlogForm
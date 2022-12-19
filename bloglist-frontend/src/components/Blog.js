import { useState } from 'react'

const Blog = ({ blog, editBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [,setAddLike] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogEdit = () => {
    const addLike = blog.likes+1
    editBlog({
      _id: blog.id,
      user:blog.user,
      likes:addLike,
      author:blog.author,
      title:blog.title,
      url:blog.url
    })
    setAddLike('')
  }

  const blogDelete = () => {
    deleteBlog(blog)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft:2,
    border:'solid',
    borderWidth:1,
    marginBottom:5
  }
  return(
    <div style={blogStyle} key={blog.id} className="blog">
      <div style={hideWhenVisible} className='blog-default' >
        {blog.title} {blog.author} <button onClick={toggleVisibility} className='view-button'>view</button>
      </div>
      <div style={showWhenVisible} className='blog-clicked'>
        <div>{blog.title} <button onClick={toggleVisibility}>hide</button></div>
        <div className='blog-url'>{blog.url}</div>
        <div className='blog-likes'>likes: {blog.likes} <button className='like-button' onClick={blogEdit}>like</button></div>
        <div>{blog.author}</div>
        {blog.user.username===user.username &&
          <div><button className='delete-button' onClick={blogDelete}>delete</button></div>
        }
        {blog.user.username===user.username &&
          <div><button onClick={blogDelete}>delete</button></div>
        }
      </div> 
    </div>
  )
}
export default Blog
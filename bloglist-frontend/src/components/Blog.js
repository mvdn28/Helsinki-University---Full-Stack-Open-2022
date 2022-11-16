import { useState } from "react";

const Blog = ({blog, editBlog}) => {
  const [visible, setVisible] = useState(false)
  const [addLike,setAddLike] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const toggleVisibility = () => {
    setVisible(!visible)
    console.log(blog)
  }

  const blogEdit = (event) =>{
    const addLike = blog.likes+1
    console.log(addLike)
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
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft:2,
    border:'solid',
    borderWidth:1,
    marginBottom:5
  }
  return(
    <div style={blogStyle} key={blog.id}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} <button onClick={toggleVisibility}>hide</button></div>  
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={blogEdit}>like</button></div>
        <div>{blog.author}</div>
      </div> 
    </div>
   
)}

export default Blog
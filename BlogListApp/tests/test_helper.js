const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "First Blog",
        author: "First author",
        url: "www.firstblog.com",
        likes:8,
        __v:0
    },{
        title: "Second Blog",
        author: "Second author",
        url: "www.secondblog.com",
        likes:5,
        __v:0
    }
]
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog =>blog.toJSON())
}
module.exports ={
    initialBlogs, blogsInDb
}
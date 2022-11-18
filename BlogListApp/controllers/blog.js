const blogRouters = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouters.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1,name:1})
    response.json(blogs)
})

blogRouters.post('/', async (request, response) => {
    const body = request.body
    const user = request.userfound    
    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    if(savedBlog.title && savedBlog.url){
        response.status(201).json(savedBlog)
    }else{
        response.status(400).end()
    }
    
})

blogRouters.delete('/:id', async (request, response, next) => {
    const user = request.userfound
    const blog = await Blog.findById(request.params.id)
    console.log(request.params.id)
    if (blog.user.toString() === user._id.toString()){
        console.log()
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }else{
        response.status(401).json({ error: 'blog user does not match logged user' })
    }
    
})

blogRouters.put('/:id', async (request, response, next) => {
    const body = request.body
 
    const updateBlog = {
        likes: body.likes
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updateBlog, { new: true })
    response.status(201).json(updatedBlog)
})

module.exports = blogRouters
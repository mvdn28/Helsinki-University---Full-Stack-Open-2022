const blogRouters = require('express').Router()
const Blog = require('../models/blog')

blogRouters.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouters.post('/', async (request, response,next) => {
    const body = request.body

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    const savedBlog = await newBlog.save()
    if(savedBlog.title && savedBlog.url){
        response.status(201).json(savedBlog)
    }else{
        response.status(400).end()
    }
    
})

blogRouters.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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
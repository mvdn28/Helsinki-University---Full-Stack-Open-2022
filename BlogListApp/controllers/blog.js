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

module.exports = blogRouters
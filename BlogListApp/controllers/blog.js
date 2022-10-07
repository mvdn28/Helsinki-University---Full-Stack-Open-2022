const blogRouters = require('express').Router()
const Blog = require('../models/blog')

blogRouters.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogRouters.post('/', (request, response,next) => {
    const blog = new Blog(request.body)

    blog.save()
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

module.exports = blogRouters
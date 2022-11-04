const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { request } = require('../app')

var token = ''
var password = '12345'
beforeAll(async() =>{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({username:'root',name:'root name', passwordHash})
    await User.deleteMany({})
    await user.save()
    console.log(user)

    await api
        .post('/api/login')
        .send({username:user.username,password:password})
        .expect('Content-Type',/application\/json/)
        .then(response =>{
            request.token =response.body.token
        })

    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


test('2 blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    const blogsAtDb = await helper.blogsInDb()
    expect(blogsAtDb).toHaveLength(helper.initialBlogs.length)
})

test('Verify if blog id is defined', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)

    expect(ids).toBeDefined()
})

test('creating a new blog using method post', async ()=>{
    const newBlog = {
        title: "Test Blog",
        author: "Test author",
        url: "www.testblog.com",
        likes:9,
        __v:0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

    const titles = blogsAtEnd.map(r=>r.title)
    expect(titles).toContain('Test Blog')
})

test('test if likes property is missing it defaults to 0', async ()=>{
    const noLikeBlog = {
        title: "No like Blog",
        author: "No like author",
        url: "www.nolikeblog.com",
        __v:0
    }

    await api
        .post('/api/blogs')
        .send(noLikeBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    expect(likes).toBeDefined()
})

test('test if returns bad request when title or url not defined', async ()=>{
    const noTitleOrUrlBlog = {
        title:"teste",
        author: "No like author",
        like:7,
        __v:0
    }

    await api
        .post('/api/blogs')
        .send(noTitleOrUrlBlog)
        .expect(400)
})


describe('updating a blog', () => {
    test('succeeds with status 201 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = -1

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(201)
        const blogsUpdated = await helper.blogsInDb()
        const likes = blogsUpdated.map(blog => blog.likes)
        expect(likes).toContain(-1)
    })
})



afterAll(() =>{
    mongoose.connection.close()
})
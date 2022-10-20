const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
describe('total likes',() => {
    const oneBlog =[{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio Nascimento",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    }]
    test('when list has only one blog, equals the likes of that',()=>{
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(5)
    })
})

describe('favorite blog',() => {
    const blogs = [{
        _id: '63513752796d6f527b67221c',
        title: "Primeiro Flamerda",
        author: "Mauricio Nascimento",
        url: "www.vaitomarnocuflamengo.com",
        likes:8,
        __v:0
    },{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio Nascimento",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    }]
    test('gets blogs list, and check which blog has more likes, and compare to the value',() => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result.likes).toEqual(8)
    })
})

describe('most blogs',() => {
    const blogs = [{
        _id: '63513752796d6f527b67221c',
        title: "Primeiro Flamerda",
        author: "Mauricio Nascimento",
        url: "www.vaitomarnocuflamengo.com",
        likes:8,
        __v:0
    },{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio Nascimento",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    },{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio Nascimento",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    },{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    },{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    }]
    test('gets blogs list, and check which author has more blogs, and tests it',() => {
        const result = listHelper.mostBlogs(blogs)
        expect(result.blogs).toEqual(3)
    })
})

describe('most Likes',() => {
    const blogs = [{
        _id: '63513752796d6f527b67221c',
        title: "Primeiro Flamerda",
        author: "Mauricio Nascimento",
        url: "www.vaitomarnocuflamengo.com",
        likes:8,
        __v:0
    },{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio Nascimento",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    },{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio Nascimento",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    },{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    },{
        _id: '63513752796d6f527b67221c',
        title: "Segundo Flamerda",
        author: "Mauricio",
        url: "www.vaitomarnocuflamengo.com",
        likes:5,
        __v:0
    }]
    test('gets blogs list, and check which author has more likes, and tests it',() => {
        const result = listHelper.mostLikes(blogs)
        expect(result.likes).toEqual(18)
    })
})
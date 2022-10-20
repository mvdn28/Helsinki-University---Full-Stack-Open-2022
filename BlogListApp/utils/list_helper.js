const dummy = (blogs) => {
    return 1;
}
const totalLikes = (blog) =>{
    return blog[0].likes
}
const favoriteBlog = (blogs) =>{
    const likes= blogs.map(blog => blog.likes)
    const favorite = likes.indexOf(Math.max(...likes))
    return {
        title: blogs[favorite].title,
        author: blogs[favorite].author,
        likes: blogs[favorite].likes,
    }
}

const mostBlogs = (blogs) => {
    const countAuthorBlogs = (blogs.map(blog =>blog.author)).reduce((acc,curr) => ((acc[curr] = (curr in acc) ? acc[curr]+1 : acc[curr]=1),acc), {})
    const arrAuthorBlogs = Object.entries(countAuthorBlogs)
    const bloger = arrAuthorBlogs.sort((a,b)=>(a[1]<b[1]) ? 1:-1)
    return{
        author:bloger[0][0],
        blogs:bloger[0][1]
    }
}
const mostLikes = (blogs) => {
    const countAuthorLikes = (blogs.map(blog =>([blog.author,blog.likes]))).reduce((acc,curr,index,arr) => {
        if (acc.some(elem =>elem[0] == curr[0])){
            acc.map(authorLikes => (authorLikes[0]==curr[0]) ? authorLikes[1]+=curr[1]: authorLikes[1]=authorLikes[1])
        }else{
            acc.push(curr)
        }
        console.log(acc)
        console.log(curr)
        return acc
    },[])
    console.log(countAuthorLikes)
    const bloger = countAuthorLikes.sort((a,b)=>(a[1]<b[1]) ? 1:-1)
    console.log(bloger)
    return{
        author:bloger[0][0],
        likes:bloger[0][1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async() => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.get(baseUrl, config)

  return request.data
}

const createBlog = async(newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data

}

const modifyBlog = async(newObject) => {
  const IdUrl=`${baseUrl}/${newObject._id}`
  console.log(IdUrl)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(IdUrl, newObject, config)
  console.log(response)
  return response.data

}
const deleteBlog = async(Object) => {
  console.log(Object)
  const IdUrl=`${baseUrl}/${Object.id}`
  console.log(IdUrl)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(IdUrl, config)
  console.log(response)
}


export default { getAll, setToken, createBlog, modifyBlog,deleteBlog }


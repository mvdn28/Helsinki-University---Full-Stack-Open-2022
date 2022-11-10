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

export default { getAll, setToken, createBlog }
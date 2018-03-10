import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const addLike = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}
const deleteBlog = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.delete(`${baseUrl}/${id}`,config)
  return request.then(response => response.data)
}



export default { getAll, setToken, addLike}
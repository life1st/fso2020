import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (t) => token = t
const auth = () => ({
  authorization: `Bearer ${token}`
})
const getAll = () => {
  if (!token) return Promise.reject()
  const request = axios.get(baseUrl, {
    headers: {...auth()}
  })
  
  return request.then(response => response.data)
}

const createNew = (info) => {
  if (!token) return Promise.reject()
  
  const req = axios.post(baseUrl, info, {
    headers: {
      ...auth()
    }
  })

  return req.then(res => res.data)
}

const updateBlog = (id, {user_id, likes}) => {
  if (!token) return Promise.reject()

  return axios.put(`${baseUrl}/${id}`, {
    user_id, likes
  }, {
    headers: {...auth()}
  })
}

const deleteBlog = (id) => {
  if (!token) return Promise.reject()

  return axios.delete(`${baseUrl}/${id}`, {
    headers: {...auth()}
  })
}

export default { setToken, getAll, createNew, updateBlog, deleteBlog }

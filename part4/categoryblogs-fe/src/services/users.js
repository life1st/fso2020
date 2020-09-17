import axios from 'axios'

const baseUrl = ''

const sendLoginReq = (username, password) => {
  const url = baseUrl + '/api/users/login'

  return axios.post(url, {username, password})
}

export {
  sendLoginReq
}

import axios from 'axios'

const isProd = process.env.NODE_ENV === 'production'

const baseUrl = isProd ? '' : 'http://localhost:3001'

export const fetchAll = () => {
  const url = baseUrl + `/api/persons`

  return axios.get(url)
}

export const fetchPersonById = (id) => {
  const url = baseUrl + `/api/persons/${id}`

  return axios.get(url)
}

export const deletePersonById = (id) => {
  const url = baseUrl + `/api/persons/${id}`

  return axios.delete(url)
}

export const editPersonPhoneNumber = (id, info) => {
  const url = baseUrl + `/api/persons/${id}`

  return axios.put(url, info)
}

export const AddPerson = ({name, number}) => {
  const url = baseUrl + `/api/persons`

  return axios.post(url, {name, number})
}
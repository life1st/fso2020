import React, { useState } from 'react'
import { sendLoginReq } from '../services/users'

const Login = ({
  afterLogin = () => {}
}) => {

  const [{name, pwd}, setInfo] = useState({name: '', pwd: ''})
  const handleInput = (e) => {
    if (e.target.name === 'name') {
      setInfo({
        pwd,
        name: e.target.value
      })
    }
    if (e.target.name === 'password') {
      setInfo({
        name,
        pwd: e.target.value
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    sendLoginReq(name, pwd).then(afterLogin).catch(afterLogin)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" onInput={handleInput} />
        <br/>
        <input type="password" name="password" placeholder="password" onInput={handleInput} />
        <br/> 
        <input type="submit"/>
      </form>
    </div>
  )
}

export {
  Login
}

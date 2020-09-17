import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { Login } from './components/Login'
import { Noti, NOTITYPES } from './components/Noti'
import { ToggleVisibleWrap } from './HOC/ToggleVisibleWrap'

const newFormInitState = {
  title: '',
  author: '',
  url: ''
}

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({...newFormInitState})
  const [noti, setNotiState] = useState(null)

  const sendBlogsReq = () => {
    blogService
      .getAll(user.token)
      .then(setBlogs)
  }

  useEffect(() => {
    if (!user) {
      let userCache = window.localStorage.getItem('__bloglist__')
      if (userCache) {
        const u = JSON.parse(userCache)
        setUser(u)
        blogService.setToken(u.token)
      }
    }
  }, [user])
  useEffect(() => {
    if (user) {
      sendBlogsReq()
    }
  }, [user])

  const setNotifacation = (message, type, timeout=1800) => {
    setNotiState({type, message})
    setTimeout(() => {
      setNotiState(null)
    }, timeout);
  }

  const handleLogged = (res) => {
    if (res.status === 200) {
      setUser(res.data)
      blogService.setToken(res.data.token)
      window.localStorage.setItem('__bloglist__', JSON.stringify(res.data))
      setNotifacation(`login success.`)
    } else {
      setNotifacation(`wrong username or password.`, NOTITYPES.ERROR)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('__bloglist__')
  }
 
  const handleCreateInput = (e) => {
    let name = e.target.name
    let info = {...newBlog}
    if (name === 'title') {
      info.title = e.target.value
    }
    if (name === 'author') {
      info.author = e.target.value
    }
    if (name === 'url') {
      info.url = e.target.value
    }
    setNewBlog(info)
  }
  const handleCreateNew = (e) => {
    e.preventDefault()
    blogService.createNew(newBlog).then(data => {
      setBlogs([
        ...blogs,
        data
      ])
      setNotifacation(`create ${data.title} success.`)
      setNewBlog({...newFormInitState})
    })
  }
  return (
    <div>
      <h2>blogs</h2>
      <Noti {...noti}/>
      {user ? (
        <>
        <p>{user.nickname} logged in.</p><button onClick={handleLogout}>log out</button>
        <h3>Create new</h3>
        <ToggleVisibleWrap showText="create">
          <form onSubmit={handleCreateNew}>
            <p>title: <input type="text" name="title" onChange={handleCreateInput} value={newBlog.title}/></p>
            <p>author: <input type="text" name="author" onChange={handleCreateInput} value={newBlog.author}/></p>
            <p>url: <input type="text" name="url" onChange={handleCreateInput} value={newBlog.url}/></p>
            <input type="submit" />
          </form>
        </ToggleVisibleWrap>
        {
          blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} 
              afterLikeClicked={res => {
                if (res.status === 200) {
                  sendBlogsReq()
                } else {
                  setNotifacation(res.name, NOTITYPES.ERROR)
                }
              }}
              afterDeleteClicked={res => {
                if (res.status === 204) {
                  sendBlogsReq()
                } else {
                  setNotifacation(res.name, NOTITYPES.ERROR)
                }
              }}
            />
          )
        }
        </>
      ) : (
        <Login afterLogin={handleLogged} />
      )}
    </div>
  )
}

export default App
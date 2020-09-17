import React from 'react'
import { ToggleVisibleWrap } from '../HOC/ToggleVisibleWrap'
import blogService from '../services/blogs'

const Blog = ({ 
  blog, 
  afterLikeClicked = () => {},
  afterDeleteClicked = () => {}
}) => {
  const handleLikeClick = () => {
    blogService
      .updateBlog(blog.id, {
        user_id: blog.user.id,
        likes: blog.likes + 1
      })
      .then(afterLikeClicked)
      .catch(afterLikeClicked)
  }
  const hadnleDeleteBlog = () => {
    if (window.confirm(`sure delete ${blog.title} ?`)) {
      blogService
        .deleteBlog(blog.id)
        .then(afterDeleteClicked)
        .catch(afterDeleteClicked)
    }
  }
  return (
    <div style={{border: '1px solid #333'}}>
      {blog.title} {blog.author}
      <ToggleVisibleWrap showText="view">
        <div>
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes}
            <button onClick={handleLikeClick}>like</button>
          </p>
          <p>{blog.user.nickname}</p>
          <button onClick={hadnleDeleteBlog}>delete</button>
        </div>
      </ToggleVisibleWrap>
    </div>
  )
}

export default Blog

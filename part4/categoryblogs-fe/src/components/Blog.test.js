import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test(`render blog`, () => {
  const blog = {
    "likes": 5,
    "title": "2anotherblog title",
    "author": "yan",
    "url": "http://localhost:27017",
    "user": {
      "nickname": "Yan",
      "blogs": [
        "5f082360fa2cb034339a925f"
      ],
      "username": "life1st",
      "id": "5f06dd7e639b70fbb184cc21"
    },
    "id": "5f081f54f57ee91b7e8b1fff"
  }

  const comp = render(
    <Blog blog={blog} />
  )

  expect(comp.container).toHaveTextContent(blog.title)
})
import React from 'react'

const Content = ({list}) => {
  return (
    <ul>
      {list.map(({part, exercises}) => (
        <li>
          {part} {exercises}
        </li>
      ))}
    </ul>
  )
}

export { Content }
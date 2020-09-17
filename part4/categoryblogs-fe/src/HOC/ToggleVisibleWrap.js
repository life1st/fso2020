import React, { useState } from 'react'

const ToggleVisibleWrap = (props) => {
  const [visible, setVisible] = useState(false)
  const { hideText, showText } = props

  return (
    <>
      {
        visible ? (
          <>
          {props.children}
          <button onClick={() => setVisible(false)}>{hideText || 'hide'}</button>
          </>
        ) : (
          <button onClick={() => setVisible(true)}>{showText || 'show'}</button>
        )
      }
    </>
  )
}

export {
  ToggleVisibleWrap
}

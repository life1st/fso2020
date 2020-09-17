import React from 'react'
import '../styles/noti.css'

const Noti = ({
  type='normal',
  message
}) => {

  return (
    <div className={`noti ${type} ${!message && 'hide'}`}>
      {message}
    </div>
  )
}

const NOTITYPES = {
  ERROR: 'error',
  NORMAL: 'normal'
}

export {
  Noti, NOTITYPES
}

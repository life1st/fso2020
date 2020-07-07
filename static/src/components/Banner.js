import React from 'react'
import './Banner.css'

const Banner = ({
  type='normal',
  message
}) => {
  if (!message) return null
  if (['normal', 'error'].indexOf(type) < 0) {
    console.error('banner wrong props.')
    return null
  }
  return (
    <div className={`banner ${type}`}>{message}</div>
  )
}

export { Banner }

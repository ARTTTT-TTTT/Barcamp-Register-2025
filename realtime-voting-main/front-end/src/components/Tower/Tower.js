import React from 'react'
import './Tower.css'

function Tower() {
  return (
    <div className="container">
      <div className="sand"></div>
      <div className="tower">
        <div className="pole"></div>
        <div className="door"></div>
        <div className="light-base"></div>
        <div className="dome"></div>
        <div className="light"></div>
      </div>
      <div className="sand-extra"></div>
    </div>
  )
}

export default Tower
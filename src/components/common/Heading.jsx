import React from "react"
import './Heading.css'

const Heading = ({ title,title2, subtitle }) => {
  return (
    <>
      <div className='headings'>
        <h1>{title}</h1>
        <h3>{title2}</h3>
        <p>{subtitle}</p>
      </div>
    </>
  )
}

export default Heading

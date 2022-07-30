import React, { useState } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link } from "react-router-dom"
import good3 from '../../../assets/goodlife3.png'

const Header = () => {
  const [navList, setNavList] = useState(false)

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            {/* <img src='./images/logo.png' alt='' /> */}
            {/* goodlife/src/assets/goodlife1.jpg */}
            <img src={good3} alt='' className="good3" />
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flex'>
            <h4>
              <span>2</span> My List
            </h4>
            <div className="goodbtn">
            <button className='btn1'>
              <i className='fa fa-log-in'></i> Sign Up
            </button>
            <button className='btn1'>
              <i className='fa fa-sign-in'></i> Log in
            </button>
            </div>
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

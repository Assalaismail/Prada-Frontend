import React from 'react'
import { Outlet, useLocation } from 'react-router';
import logo from '../Assets/logo_english.png';
import { Link } from 'react-router-dom';

const Header = () => {
  let location=useLocation()

  return (
    <>
<section className="mainer">
  <main className="main">
  <div className='nav'>
        <div className="navbar-header">
            <Link to="/">
            <img src={logo} alt="logo" className="logo"></img>
            </Link>
        </div>
    </div>
    <Outlet/>

  </main>
</section>

    </>

  )
}

export default Header

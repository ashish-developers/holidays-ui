import React from 'react';
import {Link} from "react-router-dom";
const Menu = () => {
  return (
    <>
    <nav className="navbar">
            <ul className='menu-item'>
            <Link to="/" className="mylink">Home</Link>
            <Link to="/placementpage" className="mylink">Placement</Link>
            <Link to="/about" className="mylink">About</Link>
            <Link to="/blog" className="mylink">Blogs</Link>
            <Link to="/contact" className="mylink">Contact Us</Link>
            </ul>
          </nav>

    </>
  )
}

export default Menu
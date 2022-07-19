import React, { useCallback, useState } from 'react';
import '../styles/components/Header.css';

function Header() {
  const [activeClassName, setActiveClassName] = useState('');
  const toggleNavbar = useCallback(() => {
    if (activeClassName === '') {
      setActiveClassName('is-active');
    }
    else {
      setActiveClassName('');
    }
  }, [activeClassName]);

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <a href="/" className="brand">Portfolio</a>
          <div onClick={toggleNavbar} className="burger" id="burger">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
          <span onClick={toggleNavbar} className={`overlay ${activeClassName}`}></span>
          <div className={`menu ${activeClassName}`} id="menu">
            <ul className="menu-inner">
              <li className="menu-item"><a className="menu-link" href="#">Home</a></li>
              <li className="menu-item"><a className="menu-link" href="#">Settings</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

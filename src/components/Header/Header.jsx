import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import logo from '../../assets/icons/Logo_2.svg'
import profile from '../../assets/icons/profile.svg'
import settings from '../../assets/icons/settings.svg'

import './Header.scss'

const Header = ({ setActiveSettings }) => {
  function settingsClickHandler() {
    setActiveSettings((prev) => !prev);
  }

  return (
    <div className="header">
        <Link 
          to="/main"
        >
          <img 
            src={logo} 
            alt="logo" 
            className='header__logo' 
          />
        </Link>

        <div className="header__actions">
            <Link 
              className="header__actions-profile" 
              to="/analytics"
            >
              <img 
                src={profile} 
                alt="profile" 
              />
            </Link>
            <img 
              src={settings} 
              alt="settings" 
              className="header__actions-settings" 
              onClick={settingsClickHandler}
            />
        </div>
    </div>
  )
}

export default Header

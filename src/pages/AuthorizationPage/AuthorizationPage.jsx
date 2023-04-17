import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import logo from '../../assets/icons/Logo_1.svg'

import './AuthorizationPage.scss'

const AuthorizationPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [activeBtn, setActiveBtn] = useState(false);

  useEffect(() => {
    setActiveBtn(login && password)
  }, [login, password]);

  const loginInputHandler = (e) => {
    setLogin(e.target.value)
  }

  const passwordInputHandler = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="AuthorizationPage">
      <div className="AuthorizationPage__form">
        <input 
          type="text" 
          className="AuthorizationPage__form__input" 
          placeholder='E-mail'
          onInput={loginInputHandler}
        />
        <input 
          type="text"
          className="AuthorizationPage__form__input" 
          placeholder='Пароль'
          onInput={passwordInputHandler}
        />
        <Link 
          className={`AuthorizationPage__form__btn ${activeBtn ? 'activeBtn' : ''}`}
          to="/main"
        >
          <p>Войти</p>
        </Link>
      </div>

      <img src={logo} alt="logo" className="AuthorizationPage__logo" />

      <div className="AuthorizationPage__circleOne circle" />
      <div className="AuthorizationPage__circleTwo circle" />
      <div className="AuthorizationPage__circleThree circle" />
      <div className="AuthorizationPage__circleFour circle" />
      <div className="AuthorizationPage__circleFive circle" />
      <div className="AuthorizationPage__circleSix circle" />
    </div>
  )
}

export default AuthorizationPage

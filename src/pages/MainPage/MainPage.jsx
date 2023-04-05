/* eslint-disable no-extend-native */
import React, { useState, useEffect } from 'react'

import Calendar from '../../components/Calendar/Calendar'
import TaskList from '../../components/TaskList/TaskList';

import './MainPage.scss'

const MainPage = () => {
  return (
    <div className="MainPage">
        <div className="MainPage__body">
          <Calendar />
          <TaskList />
        </div>
    </div>
  )
}

export default MainPage

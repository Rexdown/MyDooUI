import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { Routes, Route, useLocation  } from 'react-router-dom';

import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage'
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import Settings from './components/Settings/Settings';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage'

import './App.scss';

function App() {
  const [activeSettings, setActiveSettings] = useState(false)
  const pathname = useLocation().pathname;

  return (
    <RecoilRoot>
      <div className="App">
        {pathname !== '/'
          ? <Header setActiveSettings={setActiveSettings} />
          : ''
        }
        <Settings 
          activeSettings={activeSettings} 
          setActiveSettings={setActiveSettings} 
        />
        <Routes>
          <Route index element={<AuthorizationPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;

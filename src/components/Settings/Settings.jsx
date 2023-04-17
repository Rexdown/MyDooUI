import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import settings from '../../assets/icons/settings_icon.svg'
import { languages, debtTypes } from '../../constants'
import { languageState, debtState } from '../../state'

import './Settings.scss'

const Settings = ({ activeSettings, setActiveSettings }) => {
  const [_languageState, setLanguageState] = useRecoilState(languageState);
  const [_debtCountState, setDebtCountState] = useRecoilState(debtState);

  function settingsClickHandler() {
    setActiveSettings((prev) => !prev);
  }

  const languageClickHandler = (item) => () => {
    setLanguageState(item);
  }

  const debtClickHandler = (item) => () => {
    setDebtCountState(item);
  }

  return (
    <div 
      className={`settings ${activeSettings ? 'active__settings' : ''}`}
      onClick={settingsClickHandler}
    >
      <div 
        className={`settings__body ${activeSettings ? 'active__settings-body' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings__body__title">
          <h3 className="settings__body__title-text">
            {_languageState.name === 'Русский'
              ? 'Настройки'
              : 'Settings'
            }
          </h3> 
          <img 
            src={settings} 
            alt="settings icon" 
            className="settings__body__title-icon" 
          />
          <div 
            className="settings__body__title-close" 
            onClick={settingsClickHandler}
          />
        </div>

        <div className="settings__body__language">
          <p className="settings__body__language-text">
            {_languageState.name === 'Русский'
              ? 'Язык'
              : 'Language'
            }
          </p>
          <div className="settings__body__select">
            <p className="settings__body__select-text">
              {_languageState.name}
            </p>
            <div className="settings__body__select-options">
              {languages.filter((item) => item.id !== _languageState.id).map((item) => (
                <div onClick={languageClickHandler(item)}>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="settings__body__debt">
          <p className="settings__body__debt-text">
            {_languageState.name === 'Русский'
              ? 'Отображать задолжности за'
              : 'Display debts for'
            }
          </p>
          <div className="settings__body__select">
            <p className="settings__body__select-text">
              {_languageState.name === 'Русский'
                ? _debtCountState.nameRu
                : _debtCountState.nameEng
              }
            </p>
            <div className="settings__body__select-options">
              {debtTypes.filter((item) => item.id !== _debtCountState.id).map((item) => (
                <div onClick={debtClickHandler(item)}>
                  <p>
                    {_languageState.name === 'Русский'
                      ? item.nameRu
                      : item.nameEng
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extend-native */
import React, { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { MonthList } from '../../constants'
import { languageState, selectDateState } from '../../state'

import './Calendar.scss'

const daysInMonth = (month, year, language) => {  
  if (month >= 0 && month < 12 ) {
    const tempList = [];
    const thisMonth = language === 'Русский'
      ? MonthList.filter((item) => item.number === month + 1)[0].nameRu
      : MonthList.filter((item) => item.number === month + 1)[0].nameEng;
    const conut = 33 - new Date(new Date().getFullYear(), month, 33).getDate();

    for (let i = 1; i <= conut; i++) {
      tempList.push({
        month: thisMonth,
        number: i,
        today: i === new Date().getDate() && month === new Date().getMonth() && 
                year === new Date().getFullYear(),
      })
    }

    return tempList;
  }

  return false;
}

const Calendar = () => {
  const language = useRecoilValue(languageState).name;
  const setSelectDate = useSetRecoilState(selectDateState)

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState(daysInMonth(month, year, language));
  const [activeDay, setActiveDay] = useState(new Date().getDate());

  useEffect(() => {
    setDays(daysInMonth(month, year, language));
  }, [month, year, language])

  useEffect(() => {
    if (activeDay !== 0) {
      setSelectDate(new Date(year, month, activeDay))
    }
  }, [activeDay])

  const chengeMonth = (month) => {
    const tempMonth = month > 11 ? 0 : month < 0 ? 11 : month;
    
    setActiveDay(0)
    setMonth(tempMonth)
  }

  const chengeYear = (month) => {
    if (month > 11) {
      setYear(year + 1)
    } else if (month < 0) {
      setYear(year - 1)
    }
  }

  return (
    <div className="calendarConteiner">
      <div className="calendar">
        {days.map((day) => (
          <div 
            key={day.number}
            className={`calendar__day ${activeDay === day.number ? 'activeDay' : ''}`}
            onClick={() => setActiveDay(day.number)}
          >
            <div className="calendar__day__content">
              <p className="calendar__day-number">
                {day.number}
              </p>
              <p className="calendar__day-month">
                {day.month}
              </p>
              <p className="calendar__day-today">
                {day.today && language === 'Русский' ? 'Сегодня' : day.today ? 'Today' : ''}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="calendar__actionsWrapper">
        <div className="calendar__actions">
          <div className="calendar__actions__prev">
            <div className="calendar__actions__prev-text">
              {language === 'Русский'
                ? MonthList.filter((item) => item.number === (month < 1 ? 12 : month))[0].nameRu
                : MonthList.filter((item) => item.number === (month < 1 ? 12 : month))[0].nameEng
              }
            </div>
            <div className="calendar__actions__prev-btn" 
              onClick={() => {
                chengeMonth(month - 1)
                chengeYear(month - 1)
              }}
            />
          </div>

          <div className="calendar__actions__info">
            <p className="calendar__actions__info-month">
              {language === 'Русский'
                ? MonthList.filter((item) => item.number === month + 1)[0].nameRu
                : MonthList.filter((item) => item.number === month + 1)[0].nameEng
              } 
            </p>
            <p className="calendar__actions__info-year">{year}</p>
          </div>

          <div 
            className="calendar__actions__next"
          >
            <div className="calendar__actions__next-btn" 
              onClick={() => {
                chengeMonth(month + 1)
                chengeYear(month + 1)
              }}
            />
            <div className="calendar__actions__next-text">
              {language === 'Русский'
                ? MonthList.filter((item) => item.number === (month + 2 > 12 ? 1 : month + 2))[0].nameRu
                : MonthList.filter((item) => item.number === (month + 2 > 12 ? 1 : month + 2))[0].nameEng
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar

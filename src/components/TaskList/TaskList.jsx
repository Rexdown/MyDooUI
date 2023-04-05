/* eslint-disable no-extend-native */
import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import fire_orange from '../../assets/icons/fire_orange.svg'
import fire_white from '../../assets/icons/fire_white.svg'
import fire_grey from '../../assets/icons/fire_grey.svg'
import trash from '../../assets/icons/trash.svg'
import ok from '../../assets/icons/ok.svg'

import { taskTypesArr } from '../../constants'
import { languageState, debtState, selectDateState } from '../../state'

import './TaskList.scss'

const TaskList = () => {
  const language = useRecoilValue(languageState).name;
  const debtCount = useRecoilValue(debtState).number;
  const selectDate = useRecoilValue(selectDateState)

  const [taskList, setTaskList] = useState([])
  const [text, setText] = useState('')
  const [debt, setDebt] = useState(false);
  const [important, setImportant] = useState(false)
  const [addFlag, setAddFlag] = useState(false)
  const [selectType, setSelectType] = useState(taskTypesArr[0])

  const [sortFlag, setSortFlag] = useState(false)
  const [sortTaskList, setSortTaskList] = useState(taskList)
  const [selectSortType, setSelectSortType] = useState('All')

  const [activeMenu, setActiveMenu] = useState(false)
  const [selectedTask, setSelectedTask] = useState()
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)

  useEffect(() => {
    console.log(selectDate)
  }, [selectDate])

  useEffect(() => {
    if (sortFlag && selectSortType !== 'All') {
      setSortTaskList(taskList.filter((task) => task.important && task.type === selectSortType));
    } else if (!sortFlag && selectSortType !== 'All') {
      setSortTaskList(taskList.filter((task) => task.type === selectSortType));
    } else if (sortFlag && selectSortType === 'All') {
      setSortTaskList(taskList.filter((task) => task.important));
    } else {
      setSortTaskList(taskList);
    }
  }, [sortFlag, selectSortType, taskList]);

  const сancelAddTask = () => {
    setSelectType(taskTypesArr[0])
    setImportant(false);
    setAddFlag(false)
    setText('');
  }

  const addTask = () => {
    if (text !== '') {
      const tempArr = [
        {
          id: Math.random().toString(16).slice(2),
          text: text,
          date: selectDate,
          type: selectType.type,
          important: important,
          complete: false,
        },
        ...taskList
      ]
      setTaskList(tempArr);
      setSelectType(taskTypesArr[0])
      setImportant(false);
      setAddFlag(false)
      setText('');
    }
  }

  const changeImportant = (item) => {
    const tempArr = [];
    taskList.forEach((task) => {
      if (task.id === item.id) {
        tempArr.push({
          ...item,
          important: !item.important,
        })
      } else {
        tempArr.push({...task})
      }
    })
    setTaskList(tempArr);
  }

  const rightClick = (e, item) => {
    e.preventDefault();
    window.addEventListener('click', () => setActiveMenu(false))

    setSelectedTask(item)
    setActiveMenu(true)
    setPosX(e.pageX)
    setPosY(e.pageY)
  };

  const isCompleteTask = () => {
    const tempArr = []

    taskList.forEach((task) => {
      if (task.id === selectedTask.id) {
        tempArr.push({
          ...task,
          complete: !task.complete,
        })
      } else {
        tempArr.push({...task})
      }
    })

    setTaskList(tempArr)
  }

  const deleteTask = () => {
    setTaskList(taskList.filter((task) => task.id !== selectedTask.id))
  }

  return (
    <div className="TaskList">
      {activeMenu
        ? <div 
            className="TaskList__menu"
            style={{left: posX, top: posY - 40}}
          >
            <img 
              src={ok} 
              alt="ok"
              onClick={() => isCompleteTask()}
            />
            <img 
              src={trash}
              alt="trash"
              onClick={() => deleteTask()}
            />
          </div>
        : ''
      }

      {addFlag 
        ? <>
            <div className="TaskList__addPanel">
              <div className="TaskList__addPanel__select">
                <p>
                  {language === 'Русский' 
                    ? selectType.nameRu
                    : selectType.nameEng
                  }
                </p>
                <img src={selectType.icon} alt="icon" />
                <div className="TaskList__addPanel__select__options">
                  {taskTypesArr.filter((item) => item.id !== selectType.id).map((item) => (
                    <div 
                      key={item.id}
                      className="TaskList__addPanel__select__options-item"
                      onClick={() => setSelectType(item)}
                    >
                      <p>
                        {language === 'Русский' 
                          ? item.nameRu
                          : item.nameEng
                        }
                      </p>
                      <img src={item.icon} alt="icon" />
                    </div>
                  ))}
                </div>
              </div>
              <div 
                className={`TaskList__addPanel__important ${important ? 'TaskList__addPanel__important-active' : ''}`}
                onClick={() => setImportant(!important)}
              >
                <p>
                  {language === 'Русский'
                    ? 'Отметить как важное'
                    : 'Mark as important'
                  }
                </p>
                {!important 
                  ? <img src={fire_orange} alt="fire" />
                  : <img src={fire_white} alt="fire" />
                }
              </div>
              <button 
                className="TaskList__addPanel-btn"
                onClick={() => сancelAddTask()}
              >
                {language === 'Русский'
                  ? 'Отменить'
                  : 'Cancel'
                }
              </button>
              <button
                className="TaskList__addPanel-btn"
                onClick={() => addTask()}
              >
                {language === 'Русский'
                  ? 'Сохранить'
                  : 'Save'
                }
              </button>
            </div>
            <input 
              type="text" 
              value={text} 
              placeholder={language === 'Русский' ? 'Задача' : 'Task'}
              className='TaskList__input' 
              onInput={(e) => setText(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask()
                }
              }}
            />
          </>
        : <div className="TaskList__actions">
            <button
              className={`TaskList__actions-flag ${debt ? 'TaskList__actions-flag-active' : ''}`}
              onClick={() => setDebt(!debt)}
            >
              {language === 'Русский'
                ? 'Задолжности'
                : 'Debts'
              }
            </button>
            <button
              className={`TaskList__actions-flag ${sortFlag ? 'TaskList__actions-flag-active' : ''}`}
              onClick={() => setSortFlag(!sortFlag)}
            >
              {language === 'Русский'
                ? 'Только важные'
                : 'Only important'
              }
            </button>
            <div className="TaskList__actions__select">
              {selectSortType === 'All'
                ? <p>All</p>
                : <img 
                    src={taskTypesArr.filter((task) => task.type === selectSortType)[0].icon} 
                    alt="icon" 
                  />
              }
              <div className="TaskList__actions__select__options">
                  {taskTypesArr.filter((item) => item.type !== selectSortType).map((item) => (
                    <div onClick={() => setSelectSortType(item.type)}>
                      <img src={item.icon} alt="icon" />
                    </div>
                  ))}
                  {selectSortType !== 'All'
                    ? <div onClick={() => setSelectSortType('All')}> 
                        <p>All</p>
                      </div>
                    : ''
                  }
              </div>
            </div>
            <div 
              className="TaskList__actions-add" 
              onClick={() => setAddFlag(true)}  
            />
          </div>
      }

      {sortTaskList?.filter((item) => (+item.date === +selectDate)).map((item) => (
        <div
          key={item.id} 
          className={`TaskList__item ${item.complete ? 'complete-task' : ''}`}
          onContextMenu={(e) => rightClick(e, item)}
        >
          <p className="TaskList__item-text">{item.text} </p>
          <div className="TaskList__item-info">
            <img src={taskTypesArr.filter((taskType) => taskType.type === item.type)[0]?.icon} alt="icon" />
            {item.important
              ? <img 
                  src={fire_orange} 
                  alt="fire" 
                  className="TaskList__item-info-important"
                  onClick={() => changeImportant(item)}
                />
              : <img 
                  src={fire_grey} 
                  alt="fire" 
                  className="TaskList__item-info-important"
                  onClick={() => changeImportant(item)}
                />
            }
          </div>
        </div>
      ))}
      {debt
        ? sortTaskList?.filter((item) => (
            +item.date < +selectDate && 
            +item.date >= +(new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate() - debtCount)) &&
            !item.complete
          )).map((item) => (
            <div
              key={item.id} 
              className="TaskList__item debt-task"
              onContextMenu={(e) => rightClick(e, item)}
            >
              <p className="TaskList__item-text">{item.text} </p>
              <div className="TaskList__item-info">
                <img src={taskTypesArr.filter((taskType) => taskType.type === item.type)[0]?.icon} alt="icon" />
                {item.important
                  ? <img 
                      src={fire_orange} 
                      alt="fire" 
                      className="TaskList__item-info-important"
                      onClick={() => changeImportant(item)}
                    />
                  : <img 
                      src={fire_grey} 
                      alt="fire" 
                      className="TaskList__item-info-important"
                      onClick={() => changeImportant(item)}
                    />
                }
              </div>
            </div>
          ))
        : ''
      }
    </div>
  )
}

export default TaskList

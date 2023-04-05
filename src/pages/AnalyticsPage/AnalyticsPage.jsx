import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import del from '../../assets/icons/test_delete.svg'
import upload from '../../assets/icons/test_upload.svg'
import pdf from '../../assets/icons/test_pdf.svg'

import './AnalyticsPage.scss'

const AnalyticsPage = () => {
  const [filesArr, setFilesArr] = useState([])

  const filesHandler = () => (e) => {
    let tempArr = Array.from(e.target.files)
    filesArr.forEach(({name}) => {
      tempArr = tempArr.filter((file) => file.name !== name)
    })
    
    setFilesArr(filesArr.concat(tempArr))
    e.target.value = ''
  }

  const deleteHandler = (name) => () => {
    setFilesArr(filesArr.filter((file) => file.name !== name))
  }

  return (
    <div className="AnalyticsPage">
      <div className="input__wrapper">
        <input 
          name="file" 
          type="file" 
          id="input__file" 
          className="input input__file" 
          onChange={filesHandler()} 
          multiple 
        />
        <label htmlFor="input__file" className="input__file-button">
            <span className="input__file-icon-wrapper">
              <img className="input__file-icon" src={upload} alt="Выбрать файл" width="25" />
            </span>
            <span className="input__file-button-text">Выберите файл</span>
        </label>
      </div>

      <div className="files">
        {filesArr && filesArr.map((file) => (
          <div className="files__item">
            <img src={pdf} alt="delete" className="files__item-icon" />
            {file.name.length <= 35 
              ? <p key={file.name} className="files__item-text">{file.name}</p>
              : <p key={file.name} className="files__item-text">
                  {file.name.substring(0, 25)}
                  ...
                  {file.name.substring(file.name.length - 10, file.name.length)}
                </p>
            }
            <img 
              src={del} 
              alt="delete" 
              className="files__item-delete" 
              onClick={deleteHandler(file.name)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnalyticsPage

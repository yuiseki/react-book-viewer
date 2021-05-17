import React, { useState } from 'react'
import '../css/BookViewer.css'
export interface BookViewer {
  pages: string[]
}

export const BookViewer: React.FC<BookViewer> = ({pages}: BookViewer) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [disable, setDisable] = useState(false)

  const checkLastPage = (page) => {
    if (page === pages.length-1) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(parseInt(e.target.value))
    checkLastPage(parseInt(e.target.value))
  }
  const onClickButton = () => {
      const newPage = currentPage +1
      setCurrentPage(newPage)
      checkLastPage(newPage)
  }
  
  return (
    <div className='container-book-viewer'>
      <button className="add-page" onClick={onClickButton} disabled={disable}>aaaaaaaaaaaaaa</button>
      <img className='image' src={pages[currentPage]} alt="" />
      <div className='tooltip-bar'>
        <input className='input' type="range" min={0} max={pages.length-1} defaultValue={0} onChange={onChange} value={currentPage}/>
      </div>
    </div>
  )
}
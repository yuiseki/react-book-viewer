import React, { useState } from 'react'
import '../css/BookViewer.css'
export interface BookViewer {
  pages: string[]
}

export const BookViewer: React.FC<BookViewer> = ({pages}: BookViewer) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(true)

  const checkPage = (page) => {
    if (page === pages.length-1) {
      setIsFirstPage(false)
      setIsLastPage(true)
    } else if (page === 0) {
      setIsFirstPage(true)
      setIsLastPage(false)
    } else {
      setIsFirstPage(false)
      setIsLastPage(false)
    }
  }
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    setCurrentPage(newValue)
    checkPage(newValue)
  }
  const nextPage = () => {
    const newValue = currentPage + 1
    setCurrentPage(newValue)
    checkPage(newValue)
  }
  const backPage = () => {
    const newValue = currentPage - 1
    setCurrentPage(newValue)
    checkPage(newValue)
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "KeyA" && !isLastPage){
      nextPage()
    } else if (e.code === "ArrowLeft" && !isLastPage){
      nextPage()
    } else if (e.code === "KeyD" && !isFirstPage){
      backPage()
    } else if (e.code === "ArrowRight" && !isFirstPage){
      backPage()
    }
  }
  // Don't attach onKeyDown to div element
  // Otherwise it will stop working
  document.onkeydown=(e)=>{onKeyDown(e)}

  return (
    <div className='container-book-viewer'>
      <div className="image-box">
        <img className='image' src={pages[currentPage]} alt=""/>
        <div className="page-buttons">
          <button className="next-page-button" onClick={nextPage} disabled={isLastPage}><div className="text">aaaaaaaaaaaaaa</div></button>
          <button className="back-page-button" onClick={backPage} disabled={isFirstPage}><div className="text">aaaaaaaaaaaaaa</div></button>
        </div>
      </div>
      <div className='tooltip-bar'>
        <input className='input' type="range" min={0} max={pages.length-1} onChange={onChange} value={currentPage}tabIndex={-1}/>
      </div>
    </div>
  )
}
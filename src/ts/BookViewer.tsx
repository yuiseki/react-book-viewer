import React, { useState } from 'react'
import '../css/BookViewer.css'
export interface BookViewer {
  pages: string[]
}

export const BookViewer: React.FC<BookViewer> = ({pages}: BookViewer) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [lastPage, setLastPage] = useState(false)
  const [firstPage, setFirstPage] = useState(true)

  const checkLastPage = (page) => {
    if (page === pages.length-1) {
      setLastPage(true)
    } else {
      setLastPage(false)
    }
  }
  const checkFirstPage = (page) => {
    if (page === 0) {
      setFirstPage(true)
    } else {
      setFirstPage(false)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(parseInt(e.target.value))
    checkLastPage(parseInt(e.target.value))
    checkFirstPage(parseInt(e.target.value))
  }
  const nextPage = () => {
      const newPage = currentPage +1
      setCurrentPage(newPage)
      checkLastPage(newPage)
      checkFirstPage(newPage)
  }
  const backPage = () => {
      const newPage = currentPage -1
      setCurrentPage(newPage)
      checkFirstPage(newPage)
      checkLastPage(newPage)
  }
  const message = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.code === "KeyA" && lastPage !== true){
       nextPage()
      }else if (e.code === "ArrowLeft" && lastPage !== true){
       nextPage()
      }else if (e.code === "KeyD" && firstPage !== true){
        backPage()
      }else if (e.code === "ArrowRight" && firstPage !== true){
        backPage()
      }else{
    }
  }
  
  return (
    <div className='container-book-viewer'  onKeyDown={(e) => message(e)} tabIndex={0}>
      <div className="image-box">
        <img className='image' src={pages[currentPage]} alt="" />
        <div className="page-buttons">
          <button className="next-page-button" onClick={nextPage} disabled={lastPage}><pre className="text">              </pre></button>
          <button className="back-page-button" onClick={backPage} disabled={firstPage}><div className="text">catchme ifucan</div></button>
        </div>
      </div>
      <div className='tooltip-bar'>
        <input className='input' type="range" min={0} max={pages.length-1} onChange={onChange} value={currentPage}/>
      </div>
    </div>
  )
}
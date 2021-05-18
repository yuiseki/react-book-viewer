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
  const message = (e) => {
      if (e.which === 97 ){
      nextPage()
      }else if (e.which === 100){
        backPage()
      }else{
    }
  }
  
  return (
    <div className='container-book-viewer'  onKeyPress={(e) => message(e)} tabIndex="0">
      <div className="image-box">
        <img className='image' src={pages[currentPage]} alt="" />
        <div className="page-buttons">
          <button className="next-page-button" onClick={nextPage} disabled={lastPage}><div className="text">aaaaaaaaaaaaaa</div></button>
          <button className="back-page-button" onClick={backPage} disabled={firstPage}><div className="text">aaaaaaaaaaaaaa</div></button>
        </div>
      </div>
      <div className='tooltip-bar'>
        <input className='input' type="range" min={0} max={pages.length-1} defaultValue={0} onChange={onChange} value={currentPage}/>
      </div>
    </div>
  )
}
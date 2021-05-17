import React, { useState } from 'react'
import '../css/BookViewer.css'
export interface BookViewer {
  pages: string[]
}

export const BookViewer: React.FC<BookViewer> = ({pages}: BookViewer) => {
  const [currentPage, setCurrentPage] = useState(0)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(parseInt(e.target.value))
  }
  const onCLickButton = () => {
      const newPage = currentPage +1
      setCurrentPage(newPage)
  }
  
  return (
    <div className='container-book-viewer'>
      <button className="add-page" onClick={onCLickButton}/>
      <img className='image' src={pages[currentPage]} alt="" />
      <div className='tooltip-bar'>
        <input className='input' type="range" min={0} max={pages.length-1} defaultValue={0} onChange={onChange}/>
      </div>
    </div>
  )
}
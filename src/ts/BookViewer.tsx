import React, { useState } from 'react'
import '../css/BookViewer.css'
export interface BookViewer {
  pages: string[]
}

export const BookViewer: React.FC<BookViewer> = ({pages}: BookViewer) => {
  const [image, setImage] = useState<string | undefined>(pages[0])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(pages[parseInt(e.target.value)])
  }
  return (
    <div className='container-book-viewer'>
      <img className='image' src={image} alt="" />
      <div className='tooltip-bar'>
        <input className='input' type="range" min={0} max={pages.length-1} defaultValue={0} onChange={onChange}/>
      </div>
    </div>
  )
}
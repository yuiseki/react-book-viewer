import React, { useState, useRef, useEffect, useCallback } from 'react'
import '../css/BookViewer.css'
export interface BookViewer {
  pages: string[],
  children?: {
    Render: React.FC
    height: string
  },
  direction?: 'ltr' | 'rtl'
}

interface Style {
  imgStyle: {
    height?: string | number
    width?: string | number
  },
  imgContainerStyle: {
    height?: string | number
    width?: string | number
  },
  imgBoxStyle: {
    height?: string | number
    width?: string | number
  }
}

export const BookViewer: React.FC<BookViewer> = ({pages, children, direction}: BookViewer) => {
  if (children && (!children?.height || (!children.height.endsWith('px') && !children.height.endsWith('%')))) {
    console.error('invalid height. use \'px\' or \'%\'')
    return null
  }
  const [currentPage, setCurrentPage] = useState(0)
  const [imgWidth, setImgWidth] = useState<number>(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(true)
  const imgElement = useRef<HTMLImageElement>(null)
  const [styles, setStyles] = useState<Style[]>([{ imgStyle: {}, imgContainerStyle: {}, imgBoxStyle: {}}])
  useEffect(() => {
    if (imgElement.current?.width && imgElement.current?.height) {
      setImgWidth(imgElement.current.width)
    }
  })

  useEffect(() => {
    const getImgSize = (img) => {
      return new Promise<{height: number, width: number}>((resolved, _rejected) => {
        const i = new Image()
        i.onload = () => {
          resolved({
            height: i.height,
            width: i.width
          })
        }
        i.src = img
      })
    }
    const decideStyle = async () => {
      const maxImgHeight = calculateImgHeight()
      const styles = await Promise.all(pages.map(async (img) => {
        const dimension = await getImgSize(img)
        return setImgStyle(dimension.width, dimension.height, maxImgHeight)
      }))
      setStyles(styles)
    }
    // check img size
    decideStyle()

    // set html body style
    const originalMargin = document.body.style.margin
    const originalOverflow = document.body.style.overflow
    document.body.style.margin = '0'
    document.body.style.overflow = 'hidden'
    // unset
    return () => {
      document.body.style.margin = originalMargin
      document.body.style.overflow = originalOverflow
    }
  }, [])
  const setImgStyle = (width, height, maxImgHeight) => {
    if (width !== 0 && height !== 0) {
      if (height > width || width*(maxImgHeight/height) < window.innerWidth) {
        return {
          imgStyle: {
            height: '100%',
            width: 'auto'
          },
          imgContainerStyle: {
            height: maxImgHeight,
            width: 'auto'
          },
          imgBoxStyle: {}
        }
      } else {
        return {
          imgStyle: {
            height: 'auto',
            width: '100%'
          },
          imgContainerStyle: {
            height: maxImgHeight,
            width: '100%'
          },
          imgBoxStyle: {
            width: '60%'
          }
        }
      }
    } else {
      return {
        imgStyle: {},
        imgContainerStyle: {},
        imgBoxStyle: {}
      }
    }
  }

  const calculateImgHeight = useCallback(() => {
    if (children?.height.endsWith('px')) {
      const heightPx = children.height.split('px')[0]
      return window.innerHeight*0.95-Number(heightPx)
    } else if (children?.height.endsWith('%')) {
      const heightPercent = children.height.split('%')[0]
      return window.innerHeight*(1-(0.05+Number(heightPercent)/100))
    } else {
      return window.innerHeight*0.95
    }
  }, [children?.height])

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

  const renderButtons = () => {
    if (direction === 'ltr') {
      return (
        <div className="page-buttons">
          <button className="go-left-button" onClick={backPage} disabled={isFirstPage} tabIndex={-1} style={{width: imgWidth/2}}>
            <button className='go-left-arrow-button' onClick={backPage} disabled={isFirstPage} tabIndex={-1} style={isFirstPage ? { opacity: '25%' } : {}}>
              <span className='go-left-arrow'></span>
            </button>
          </button>
          <button className="go-right-button" onClick={nextPage} disabled={isLastPage} tabIndex={-1} style={{width: imgWidth/2}}>
          <button className='go-right-arrow-button' onClick={nextPage} disabled={isLastPage} tabIndex={-1} style={isLastPage ? { opacity: '25%' } : {}}>
              <span className='go-right-arrow'></span>
            </button>
          </button>
        </div>
      )
    } else {
      return (
        <div className="page-buttons">
          <button className="go-left-button" onClick={nextPage} disabled={isLastPage} tabIndex={-1} style={{width: imgWidth/2}}>
            <button className='go-left-arrow-button' onClick={nextPage} disabled={isLastPage} tabIndex={-1} style={isLastPage ? { opacity: '25%' } : {}}>
              <span className='go-left-arrow'></span>
            </button>
          </button>
          <button className="go-right-button" onClick={backPage} disabled={isFirstPage} tabIndex={-1} style={{width: imgWidth/2}}>
          <button className='go-right-arrow-button' onClick={backPage} disabled={isFirstPage} tabIndex={-1} style={isFirstPage ? { opacity: '25%' } : {}}>
              <span className='go-right-arrow'></span>
            </button>
          </button>
        </div>
      )
    }
  }
  console.log(styles)
  return (
    <div className='container-book-viewer' style={{height: window.innerHeight}}>
      {children && <children.Render/>}
      <div className='image-container' style={styles[currentPage]?.imgContainerStyle}>
        <div className="image-box" style={styles[currentPage]?.imgBoxStyle}>
          <img className='image' src={pages[currentPage]} alt="" ref={imgElement} style={styles[currentPage]?.imgStyle}/>
          {renderButtons()}
        </div>
      </div>
      <div className='tooltip-bar'>
        <input className='input' type="range" min={0} max={pages.length-1} onChange={onChange} value={currentPage} style={direction ? {direction: direction} : {direction: 'rtl'}}/>
      </div>
    </div>
  )
}
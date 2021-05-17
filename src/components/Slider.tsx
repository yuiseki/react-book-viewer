import React from 'react'

export interface SliderProps {
  pages: any[]
}

export const Slider: React.FC<SliderProps> = ({pages}: SliderProps) => {
  return (
    <input type="range" min='0' max={pages.length}/>
  )
}
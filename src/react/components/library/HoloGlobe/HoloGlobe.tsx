import React from 'react'
import hologlobe from '../../../../../public/assets/blender/hologlobe.mp4'

const HoloGlobe = ({ width, className }: HoloGlobeProps) => {
  return <video
    style={{ width }}
    autoPlay={true}
    loop={true}
    src={hologlobe}
    className={className}
  />
}

export default HoloGlobe

interface HoloGlobeProps {
  width: number
  className?: string
}



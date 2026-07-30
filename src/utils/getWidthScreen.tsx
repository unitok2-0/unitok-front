/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'

export function getWidthScreen() {
  const [windowWidth, setWindowWidth] = useState<number>()

  useEffect(() => {
    window.onscroll = () => setWindowWidth(window.screen.width)
  }, [windowWidth])

  return windowWidth
}

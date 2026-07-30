import React, { useEffect } from 'react'

interface ScrollProps {
  setWidth: (width: number) => void
}

export default function Scroll({ setWidth }: ScrollProps) {
  useEffect(function mount() {
    function onScroll() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('scroll', onScroll)

    return function unMount() {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return null
}

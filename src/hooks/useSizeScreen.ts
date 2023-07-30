import { useEffect, useState } from 'react'

type SizeTypes = {
  width: number
  height: number
}

const InitialWidth = () => {
  if (typeof window !== 'undefined') {
    return window.screen.width
  }
  return 1080
}

const InitialHeight = () => {
  if (typeof window !== 'undefined') {
    return window.screen.height
  }
  return 920
}

const useSizeScreen = () => {
  const initialState = {
    width: InitialWidth(),
    height: InitialHeight(),
  }

  const [size, setSize] = useState<SizeTypes>(initialState)

  const ChangeSize = () => {
    if (typeof window !== 'undefined') {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight

      setSize({ width, height })
    }
  }

  useEffect(() => {
    ChangeSize()

    window.addEventListener('resize', ChangeSize)
  }, [])

  return size
}

export default useSizeScreen

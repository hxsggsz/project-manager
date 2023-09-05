import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useHash = () => {
  const router = useRouter()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const getHash = (hash: string) => {
      setHash(hash)
      console.log(hash)
    }

    router.events.on('hashChangeStart', getHash)

    return () => {
      router.events.off('hashChangeStart', getHash)
    }
  }, [router.events])

  return { hash }
}

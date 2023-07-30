import { GetServerSideProps } from 'next'
import { Header } from '../components/header'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import { UserProps } from '@/utils/types/dashboard'
import { Navbar } from '@/components/navbar'
import { useState, useEffect } from 'react'
import useSizeScreen from '@/hooks/useSizeScreen'

export default function Dashboard({ user }: UserProps) {
  const { width } = useSizeScreen()
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    width <= 570 ? setIsOpen(false) : setIsOpen(true)
  }, [width])

  return (
    <>
      <Header navbarOpen={isOpen} user={user} />
      <Navbar isOpen={isOpen} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getCookie('token', ctx)
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/signup',
      },
    }
  }
  const user = jwtDecode(token.toString())
  return {
    props: { user },
  }
}

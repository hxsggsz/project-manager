import { GetServerSideProps } from 'next'
import { Header } from '../components/header'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import { User, DashboardProps } from '@/utils/types/dashboard'
import { Navbar } from '@/components/navbar'
import { useState, useEffect } from 'react'
import useSizeScreen from '@/hooks/useSizeScreen'
import { Home } from '@/components/home'
import { useGetProjects } from '@/hooks/useProject'
import Head from 'next/head'

export default function Dashboard({ user }: DashboardProps) {
  const { width } = useSizeScreen()
  const { data } = useGetProjects(user.sub)
  const [isOpen, setIsOpen] = useState(true)
  const handleOpen = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    width <= 625 ? setIsOpen(false) : setIsOpen(true)
  }, [width])

  return (
    <>
      <Head>
        <title>PM - Dashboard</title>
      </Head>

      <div className="flex h-screen">
        <Header navbarOpen={isOpen} user={user} handleNavBar={handleOpen} />
        <Navbar
          isOpen={isOpen}
          handleOpen={handleOpen}
          projects={data?.projects}
        />
        <div className="flex w-full justify-center max-sm:w-4/5">
          <Home projects={data?.projects} />
        </div>
      </div>
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

  const user: User = jwtDecode(token.toString())
  return {
    props: { user },
  }
}

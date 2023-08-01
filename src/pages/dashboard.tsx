import { GetServerSideProps } from 'next'
import { Header } from '../components/header'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import { User, DashboardProps, Projects } from '@/utils/types/dashboard'
import { Navbar } from '@/components/navbar'
import { useState, useEffect } from 'react'
import useSizeScreen from '@/hooks/useSizeScreen'
import { Home } from '@/components/home'
import { api } from '@/lib/api'
import { useQuery } from 'react-query'

export default function Dashboard({ user }: DashboardProps) {
  const { width } = useSizeScreen()
  const [isOpen, setIsOpen] = useState(true)
  const token = getCookie('token')

  const handleOpen = () => setIsOpen((prev) => !prev)
  useEffect(() => {
    width <= 570 ? setIsOpen(false) : setIsOpen(true)
  }, [width])

  const { data } = useQuery<Projects>('personal info', async () => {
    const response = await api.get(`/project/${user.sub}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  })
  return (
    <>
      <Header navbarOpen={isOpen} user={user} />
      <div className="flex h-screen">
        <Navbar
          isOpen={isOpen}
          handleOpen={handleOpen}
          projects={data?.projects || []}
        />
        <div className="flex w-3/4 justify-center max-md:w-full">
          <Home userId={user.sub} />
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
  // const projectsResponse = await api.get(`project/${user.sub}`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // })
  return {
    props: { user },
  }
}

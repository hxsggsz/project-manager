import { GetServerSideProps } from 'next'
import { Header } from '../components/header'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import { UserProps } from '@/utils/types/dashboard'

export default function Dashboard({ user }: UserProps) {
  return (
    <>
      <Header user={user} />
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

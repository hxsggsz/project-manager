import { api } from '@/lib/api'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query

  try {
    const registerResponse = await api.post('/github', { code })

    const { access_token, refresh_token } = registerResponse.data

    setCookie('token', access_token, {
      req,
      res,
      path: '/',
      maxAge: 2592000,
    })

    setCookie('refresh', refresh_token, {
      req,
      res,
      path: '/',
      maxAge: 2592000,
    })

    return res.redirect('/dashboard')
  } catch (error: any) {
    console.log(error.message)
  }
}

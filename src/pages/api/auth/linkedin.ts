import { api } from '@/lib/api'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query

  try {
    const registerResponse = await api.post('/linkedin', { code })

    const { token } = registerResponse.data

    setCookie('token', token, {
      req,
      res,
      path: '/',
      maxAge: 2592000,
    })

    return res.redirect('/dashboard')
  } catch (error: any) {
    console.log('[linkedin]: ', error.response.data.message)
  }
}

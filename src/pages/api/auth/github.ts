import { api } from '@/lib/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query
  // const response = NextResponse.next()

  const registerResponse = await api.post('/github', { code })

  const { token } = registerResponse.data

  setCookie('token', token, {
    req,
    res,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  return res.redirect('/login')
}

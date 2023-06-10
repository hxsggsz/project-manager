import { api } from '@/lib/api'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query

  const registerResponse = await api.post('/github', { code })

  const { token } = registerResponse.data

  setCookie('tokenGithub', token, {
    req,
    res,
    path: '/',
  })

  return res.redirect('/login')
}

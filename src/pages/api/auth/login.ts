import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query

  setCookie('token', token, {
    req,
    res,
    path: '/',
    maxAge: 2592000,
  })

  return res.redirect('/dashboard')
}

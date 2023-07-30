import { deleteCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    deleteCookie('token', { req, res })

    deleteCookie('refresh', { req, res })

    return res.redirect('/login')
  } catch (error) {
    console.log(error)
  }
}

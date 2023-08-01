import { api } from '@/lib/api'

export const fetcher = (url: string, token: string) =>
  api
    .get(url, { headers: { Authorization: 'Bearer ' + token } })
    .then((res) => res.data)

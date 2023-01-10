// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response : NextApiResponse) => {
  const name = 'John Dee'

  return response.json(name)

}
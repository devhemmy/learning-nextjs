// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse<string>) => {
  const {
    query: { id },
  } = req;

  res.statusCode = 200;
  res.json(`Post: ${id}`);
};

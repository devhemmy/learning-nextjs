// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};
export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
  res.statusCode = 200;
  res.json({ name: 'Hello from Hemmy' });
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method === "GET") {
        const result = await axios.get("http://45.117.82.171:8000/sphinx/point_job?year=2017");
        if(result.data) {
            res.status(200).json(result.data?.SAP_DATA)
        } else {
            res.status(200).json([])
        }
    } else {
        res.status(404);
    }
}


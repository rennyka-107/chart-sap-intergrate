// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const result = await axios.get(
      `http://45.117.82.171:8000/sphinx/contract_chart${
        req.query.year ? `?year=${req.query.year}` : ""
      }`
    );
    if (result.data) {
      res.status(200).json(result.data?.HEADCOUNT?.map((item:any)=> ({...item, DATA: item.DATA})));
    } else {
      res.status(200).json([]);
    }
  } else {
    res.status(404);
  }
}

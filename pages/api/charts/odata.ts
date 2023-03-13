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
      `http://45.117.82.171:8000/sap/opu/odata/sap/ZDEP_AVERAGE_SRV/DeptaverageSet(Mandt='800',ZYear='2017',Department='IT')?$format=json`,
      {
        headers: {
            Authorization: "Basic dnVvbmc6dHVlbWluaDQ="
        }
      }
    );
    if (result.data) {
      res.status(200).json(result.data);
    } else {
      res.status(200).json([]);
    }
  } else {
    res.status(404);
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "lodash.isempty";

type Data = any;

const ArrayMapDepartments = [
  {
    label: "SICK",
    description: "Sick leave",
  },
  {
    label: "VOCATION",
    description: "Vocation leave",
  },
];

// http://win-saptest.sphinxjsc.com:8000/sap/opu/odata/sap/ZGS_LEAVE_BY_YEAR_SRV/LEAVESet?$format=json

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const result = await axios.get(
      `http://45.117.82.171:8000/sap/opu/odata/sap/ZGS_LEAVE_BY_YEAR_SRV/LEAVESet?$format=json`,
      {
        headers: {
          Authorization: "Basic dnVvbmc6dHVlbWluaDQ=",
        },
      }
    );
    const data = result?.data?.d?.results;
    const formatData = data.map((item:any) => ({
      YEAR: item.Zyear,
      SICK: item.Sick,
      VOCATION: item.Vocation
    }))

    if (result.data) {
      res.status(200).json({ data: formatData });
    } else {
      res.status(200).json([]);
    }
  } else {
    res.status(404);
  }
}

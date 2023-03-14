// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "lodash.isempty";
import { it } from "node:test";

type Data = any;

const ArrayMapDepartments = [
  {
    label: "PRONUM",
    description: "Training Programs",
  },
  {
    label: "PATICIPANTS",
    description: "Paticipants",
  },
  {
    label: "TOTALCOST",
    description: "Total Cost",
  },
  {
    label: "HOURSSPENT",
    description: "Hours Spent In Training",
  },
  {
    label: "HOURSVSTARGET",
    description: "Hours of Training vs Target",
  },
  {
    label: "COSTVSTARGET",
    description: "Actual Cost vs Training Budget",
  },
];

// http://win-saptest.sphinxjsc.com:8000/sap/opu/odata/sap/ZGS_ETRAIN_COST_SRV/data_outputSet?$format=json

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const result = await axios.get(
      `http://45.117.82.171:8000/sap/opu/odata/sap/ZGS_ETRAIN_COST_SRV/data_outputSet?$format=json`,
      {
        headers: {
          Authorization: "Basic dnVvbmc6dHVlbWluaDQ=",
        },
      }
    );
    const data = result?.data?.d?.results;
    const formatData = data.map((obj: any) => {
      const arrData = [];
      for (const property in obj) {
        const findItem = ArrayMapDepartments.find(
          (item: any) => item.label === property.toLocaleUpperCase()
        );
        if (property !== "Zyear" && property !== "__metadata") {
          arrData.push({
            DATA: obj[property],
            LABEL: !isEmpty(findItem) ? findItem?.description : property,
          });
        }
      }
      return {
        YEAR: obj.Zyear,
        DATA: arrData,
      };
    });

    const allFormatData = ArrayMapDepartments.map((item: any) => {
      let value = 0;
      let avgNum = 0;
      let max = 0;
      formatData.forEach((dt: any) => {
        dt.DATA.forEach((it: any) => {
          if (it.LABEL === item.description) {
            value += Number(it.DATA.toString().replace("K", ""));
            if (Number(it.DATA) > 0) {
              avgNum += 1;
            }
            if (Number(it.DATA) > max) {
              max = Number(it.DATA);
            }
          }
        });
      });
      return {
        LABEL: item.description,
        DATA:
          item.label === "HOURSVSTARGET" || item.label === "COSTVSTARGET"
            ? avgNum > 0
              ? value / avgNum
              : 0
            : item.label === "PRONUM"
            ? max
            : item.label === "TOTALCOST"
            ? value + "K"
            : value,
      };
    });

    if (result.data) {
      res.status(200).json({ data: formatData, dataAll: allFormatData });
    } else {
      res.status(200).json([]);
    }
  } else {
    res.status(404);
  }
}

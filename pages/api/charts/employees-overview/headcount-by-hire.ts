// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "lodash.isempty";

type Data = any;

const ArrayMapDepartments = [
  {
    label: "HEADCOUNT",
    description: "Headcount",
  },
  {
    label: "HIRES",
    description: "Hires",
  },
  {
    label: "TERMINATION",
    description: "Termination",
  },
  {
    label: "TURNOVERRATE",
    description: "Turnover Rate",
  },
];

// http://win-saptest.sphinxjsc.com:8000/sap/opu/odata/sap/ZGS_EHEADCOUNT_SRV/data_outputSet?$format=json

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const result = await axios.get(
      `http://45.117.82.171:8000/sap/opu/odata/sap/ZGS_EHEADCOUNT_SRV/data_outputSet?$format=json`,
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
      if (item.label !== "HEADCOUNT") {
        formatData.forEach((dt: any) => {
          dt.DATA.forEach((it: any) => {
            if (it.LABEL === item.description) value += it.DATA;
          });
        });
      } else {
        value =
          formatData
            .find((itm: any) => itm.YEAR === "2020")
            ?.DATA.find((itms: any) => itms.LABEL === "Headcount")?.DATA ?? 0;
      }

      return {
        LABEL: item.description,
        DATA: value,
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

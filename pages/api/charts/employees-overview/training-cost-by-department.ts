// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "lodash.isempty";

type Data = any;

const ArrayMapDepartments = [
  {
    label: "SALES",
    description: "Sales",
  },
  {
    label: "ITIS",
    description: "IT/IS",
  },
  {
    label: "PRODUCTION",
    description: "Production",
  },
  {
    label: "SOFTWAREENGINEERING",
    description: "Software Engineering",
  },
  {
    label: "ADMINOFFICES",
    description: "Admin Offices",
  },
  {
    label: "EXECUTIVEOFFICE",
    description: "Executive Office",
  },
  {
    label: "HUMANRESOURCES",
    description: "Human Resources",
  },
];

// http://win-saptest.sphinxjsc.com:8000/sap/opu/odata/sap/ZGS_TTC_BY_D_SRV/TOTALCOSTSet?$format=json

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const result = await axios.get(
      `http://45.117.82.171:8000/sap/opu/odata/sap/ZGS_TTC_BY_D_SRV/TOTALCOSTSet?$format=json`,
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
        if (
          property !== "Zyear" &&
          property !== "__metadata" &&
          property !== "Currency"
        ) {
          arrData.push({
            DATA: 10 * Number(obj[property]),
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
      formatData.forEach((dt: any) => {
        dt.DATA.forEach((it: any) => {
          if (it.LABEL === item.description) value += Number(it.DATA);
        });
      });
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

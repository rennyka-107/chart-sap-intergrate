// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "lodash.isempty";

type Data = any;

const ArrayMapDepartments = [
  {
    label: "POWERBI",
    description: "Power BI",
  },
  {
    label: "EXCEL",
    description: "Microsoft excel",
  },
  {
    label: "MIOFFICE",
    description: "Microsoft office",
  },
  {
    label: "CODECONDUCT",
    description: "Code of Conduct",
  },
  {
    label: "PROTRAIN1",
    description: "Production training 1",
  },
  {
    label: "WORKHS",
    description: "Work Health & Safety",
  },
  {
    label: "ADVANCEPRESKILL",
    description: "Advance presentation skill",
  },
  {
    label: "CUSSERVICECOM",
    description: "Customer Services & Communication",
  },
  {
    label: "PROTRAIN3",
    description: "Production Training 3",
  },
  {
    label: "ADVANCEBUSSTRA",
    description: "Advance Business Strategy",
  },
  {
    label: "PROTRAIN2",
    description: "Production Training 2",
  },
];

// http://win-saptest.sphinxjsc.com:8000/sap/opu/odata/sap/ZGW_T_TRAINCOST_SRV/TraincostSet?$format=json

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const result = await axios.get(
      `http://45.117.82.171:8000/sap/opu/odata/sap/ZGW_T_TRAINCOST_SRV/TraincostSet?$format=json`,
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
      formatData.forEach((dt: any) => {
        dt.DATA.forEach((it: any) => {
          if (it.LABEL === item.description) value += it.DATA;
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

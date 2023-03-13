// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "lodash.isempty";

type Data = any;

const ArrayMapDepartments = [
  {
    label: "CS",
    description: "Customer service",
  },
  {
    label: "MS",
    description: "Marketing specialist",
  },
  {
    label: "HRP",
    description: "HR Personnel",
  },
  {
    label: "BA",
    description: "Business analyst",
  },
  {
    label: "ACC",
    description: "IT Management",
  },
  {
    label: "HRM",
    description: "Accountant",
  },
  {
    label: "ITM",
    description: "HR Manager",
  },
  {
    label: "ITS",
    description: "BI Consultant",
  },
  {
    label: "MM",
    description: "IT Support",
  },
  {
    label: "BIC",
    description: "Marketing manager",
  },
  {
    label: "COO",
    description: "COO",
  },
  {
    label: "FM",
    description: "Finance Analyst",
  },
  {
    label: "CEO",
    description: "CEO",
  },
  {
    label: "CFO",
    description: "CFO",
  },
  {
    label: "CIO",
    description: "CIO",
  },
  {
    label: "CMO",
    description: "CMO",
  },
  {
    label: "CTO",
    description: "CTO",
  },
  {
    label: "DA",
    description: "Data Analyst",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const result = await axios.get(
      `http://45.117.82.171:8000/sap/opu/odata/sap/ZGS_EHCBY_POS_SRV/EmpbyposSet?$format=json`,
      {
        headers: {
          Authorization: "Basic dnVvbmc6dHVlbWluaDQ=",
        },
      }
    );
    console.log(result.data, "data");
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

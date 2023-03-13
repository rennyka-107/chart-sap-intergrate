import useContract from "@/src/hooks/useContract";
import useLoading from "@/src/hooks/useLoading";
import useSummaryChartBar, {
  TypeDetailAverageScore,
  TypeDetailHeadcount,
} from "@/src/hooks/useSummaryChartBar";
import axios from "axios";
import isEmpty from "lodash.isempty";
import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

type Props = {
  dataHeadCountByPosition: { LABEL: string; DATA: number }[];
  dataHeadCountByDepartment: { LABEL: string; DATA: number }[];
};

const ChartPartHeadCountByPosition = ({ title, data }: any) => {
  return (
    <div className="md:w-[49%] w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">{title}</p>
      <div className="w-full flex justify-center md:min-h-[200px] xl:min-h-[300px]">
        <Bar
          data={{
            labels: !isEmpty(data)
              ? data.map((item: { LABEL: string; DATA: number }) => item.LABEL)
              : [],
            datasets: [
              {
                label: "Headcount",
                backgroundColor: !isEmpty(data)
                  ? data.map(() => "#3e95cd")
                  : [],
                data: !isEmpty(data)
                  ? data.map(
                      (item: { LABEL: string; DATA: number }) => item.DATA
                    )
                  : [],
              },
            ],
          }}
          options={{
            // onClick: function (event, element) {
            //   console.log(element, "log bar");
            // },
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

const ChartPartHeadcountByDepartment = ({ title, data }: any) => {
  return (
    <div className="md:w-[49%] w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">{title}</p>
      <div className="w-full flex justify-center md:min-h-[200px] xl:min-h-[400px]">
      <Bar
          data={{
            labels: !isEmpty(data)
              ? data.map((item: { LABEL: string; DATA: number }) => item.LABEL)
              : [],
            datasets: [
              {
                label: "Headcount",
                backgroundColor: !isEmpty(data)
                  ? data.map(() => "#3e95cd")
                  : [],
                data: !isEmpty(data)
                  ? data.map(
                      (item: { LABEL: string; DATA: number }) => item.DATA
                    )
                  : [],
              },
            ],
          }}
          options={{
            // onClick: function (event, element) {
            //   console.log(element, "log bar");
            // },
            indexAxis: "y",
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

const BotChart = ({ dataHeadCountByPosition,dataHeadCountByDepartment }: Props) => {
  const {
    getInitialData,
    headcountByPosition,
  } = useSummaryChartBar();
  const { turnOn, turnOff } = useLoading();
  const { getInitialData: getInitPie } = useContract();

  useEffect(() => {
    getInitPie && getInitPie("2017");
  }, [getInitPie]);
  useEffect(() => {
    getInitialData && getInitialData("2017", turnOn, turnOff, turnOff);
  }, [getInitialData]);
  return (
    <div className="flex flex-wrap flex-col md:flex-row justify-around">
      <ChartPartHeadCountByPosition
        data={dataHeadCountByPosition}
        title="Headcount By Position"
      />
      <ChartPartHeadcountByDepartment
        data={dataHeadCountByDepartment}
        title="Headcount By Department"
      />
    </div>
  );
};

export default BotChart;

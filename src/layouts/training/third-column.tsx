import useChartData from "@/src/hooks/useChartData";
import isEmpty from "lodash.isempty";
import React from "react";
import { Bar } from "react-chartjs-2";

type Props = {};

const ChartPartTrainingCostByDepartment = ({ title, data }: any) => {
  return (
    <div className="md:w-[49%] w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">{title}</p>
      <div className="w-full flex justify-center lg:min-h-[200px] xl:min-h-[300px]">
        <Bar
          data={{
            labels: !isEmpty(data)
              ? data.map((item: { LABEL: string; DATA: number }) => item.LABEL)
              : [],
            datasets: [
              {
                label: "Headcount",
                backgroundColor: !isEmpty(data)
                  ? data.map(() => "#F06292")
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
            maintainAspectRatio: false,
            responsive: true,
            indexAxis: "y",
            scales: {
              x: {
                ticks: {
                  callback: (value) =>
                    `${value !== 0 ? currencyFormat(Number(value)) : "0"} kr.`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const ChartPartTrainingCostByYear = ({ title, data }: any) => {
  return (
    <div className="md:w-[49%] w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">{title}</p>
      <div className="w-full flex justify-center lg:min-h-[200px] xl:min-h-[300px]">
        <Bar
          data={{
            labels: !isEmpty(data)
              ? data.map((item: { YEAR: string; DATA: number }) => item.YEAR)
              : [],
            datasets: [
              {
                label: "Headcount",
                backgroundColor: !isEmpty(data)
                  ? data.map(() => "#F06292")
                  : [],
                data: !isEmpty(data)
                  ? data.map(
                      (item: { YEAR: string; DATA: number }) => item.DATA
                    )
                  : [],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            indexAxis: "y",
            scales: {
              x: {
                ticks: {
                  callback: (value) =>
                    `${value !== 0 ? currencyFormat(Number(value)) : "0"} kr.`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

function currencyFormat(num: number) {
  if (!num) {
    return;
  }
  return Number(num)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const ThirdColumn = ({}: Props) => {
  const { trainingDepartmentFilter, trainingCalTotal } = useChartData();

  return (
    <div className="h-[100%] flex flex-col md:flex-row justify-between">
      <ChartPartTrainingCostByYear
        data={trainingCalTotal?.sort((a, b) => b.DATA - a.DATA)}
        title="Total Training Cost By Year"
      />
      <ChartPartTrainingCostByDepartment
        data={trainingDepartmentFilter?.sort((a, b) => b.DATA - a.DATA)}
        title="Total Training Cost By Department"
      />
    </div>
  );
};

export default ThirdColumn;

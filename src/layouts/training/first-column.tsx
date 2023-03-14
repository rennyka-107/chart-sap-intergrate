import useChartData from "@/src/hooks/useChartData";
import isEmpty from "lodash.isempty";
import React from "react";
import { Bar } from "react-chartjs-2";

type Props = {
};

const ChartPartTotalCostByProgram = ({ title, data }: any) => {
  return (
    <div className="w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">{title}</p>
      <div className="w-full flex justify-center lg:min-h-[200px] xl:min-h-[400px]">
        <Bar
          data={{
            labels: !isEmpty(data)
              ? data.map((item: { LABEL: string; DATA: number }) => item.LABEL)
              : [],
            datasets: [
              {
                label: "Headcount",
                backgroundColor: !isEmpty(data)
                  ? data.map(() => "#76eec6")
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
            indexAxis: "y",
            maintainAspectRatio: false,
            responsive: true,
            plugins: {},
            scales: {
              x: {
                ticks: {
                  callback: (value) => `${value} kr.`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const FirstColumn = ({ }: Props) => {
  const { trainingTotalCostByProgramFilter } = useChartData();
  return (
    <ChartPartTotalCostByProgram
      data={trainingTotalCostByProgramFilter?.sort((a, b) => b.DATA - a.DATA)}
      title="Total Training Cost By Training Program"
    />
  );
};

export default FirstColumn;

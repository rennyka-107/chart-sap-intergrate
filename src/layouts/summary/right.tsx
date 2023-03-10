import React from "react";
import { Bar } from "react-chartjs-2";

type Props = {};

const BAR_CHART = [
  { MONTH: "January", DATA: 40 },
  { MONTH: "February", DATA: 20 },
  { MONTH: "March", DATA: 12 },
  { MONTH: "April", DATA: 39 },
  { MONTH: "May", DATA: 10 },
  { MONTH: "June", DATA: 40 },
  { MONTH: "July", DATA: 39 },
];

const ChartPart = (props: any) => {
  return (
    <div className="w-[49%] flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">Headcount by Contract Type</p>
      <div className="w-full flex justify-center lg:min-h-[300px]">
        <Bar
          data={{
            labels: BAR_CHART.map((item) => item.MONTH),
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: BAR_CHART.map((item) => "#3e95cd"),
                data: BAR_CHART.map((item) => item.DATA),
              },
            ],
          }}
          options={
            {
              // indexAxis: "y",
              //   legend: { display: false },
              //   title: {
              //     display: true,
              //     text: "Predicted world population (millions) in 2050",
              //   },
            }
          }
        />
      </div>
    </div>
  );
};

const RightPart = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-around">
      <ChartPart />
      <ChartPart />
      <ChartPart />
      <ChartPart />
    </div>
  );
};

export default RightPart;

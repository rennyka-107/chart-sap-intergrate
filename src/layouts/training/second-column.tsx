import useChartData from "@/src/hooks/useChartData";
import isEmpty from "lodash.isempty";
import React from "react";
import { Doughnut } from "react-chartjs-2";

type Props = {
};

const ChartPart = ({ labels, datasets, title }: any) => {
  return (
    <div className="md:w-[49%] w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-1 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="m-0 p-0 font-semibold">{title}</p>
      <div className="w-120px flex justify-center">
        <Doughnut
          data={{
            labels,
            datasets,
          }}
          options={{
            aspectRatio: 2,
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const SecondColumn = ({ }: Props) => {
  const { trainingTotalCostOverviewFilter, trainingTypeFilter } =
    useChartData();

  function getTotal(
    arr: { LABEL: string; DATA: number | string }[],
    { LABEL, DATA }: { LABEL: string; DATA: number | string }
  ) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
      result += Number(arr[i]["DATA"]);
    }
    if (result !== 0) {
      return Math.round((10000 * Number(DATA)) / result) / 100 + "%";
    }
    return "0%";
  }

  return (
    <div className="h-[100%] flex flex-col md:flex-row justify-between">
      <ChartPart
        title="Training Type"
        labels={
          !isEmpty(trainingTypeFilter)
            ? trainingTypeFilter.map(
                (item) =>
                  `${getTotal(trainingTypeFilter, item) + " " + item.LABEL} (${item.DATA})`
              )
            : []
        }
        datasets={[
          {
            label: " Headcount",
            backgroundColor: (trainingTypeFilter ?? []).map(
              (item) => "#" + Math.floor(Math.random() * 16777215).toString(16)
            ),
            data: (trainingTypeFilter ?? []).map((item) => item.DATA),
          },
        ]}
      />

      <InformationPart
        arrayData={trainingTotalCostOverviewFilter?.filter(
          (item: { LABEL: string; DATA: string | number }) =>
            item.LABEL === "Hours of Training vs Target" ||
            item.LABEL === "Actual Cost vs Training Budget"
        )}
      />
    </div>
  );
};

export default SecondColumn;

const InformationPart = ({
  arrayData,
}: {
  arrayData: { LABEL: string; DATA: number | string }[];
}) => {
  return (
    <div className="w-full md:w-[49%] flex flex-col gap-[5px]">
      {!isEmpty(arrayData) ? (
        arrayData.map((item) => (
          <div key={item.LABEL} className="w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-5 mt-2 items-center shadow-lg shadow-blue-200">
            <p className="text-[1.5rem]">{item.LABEL}</p>
            <p>{Math.round(100 * Number(item.DATA)) / 100}%</p>
          </div>
        ))
      ) : (
        <></>
      )}
      {isEmpty(arrayData) ? (
        <div className="w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-5 mt-2 items-center shadow-lg shadow-blue-200">
          <p className="text-[1.5rem]">Hours of Training Vs Target</p>
          <p>73,49%</p>
        </div>
      ) : (
        <></>
      )}
      {isEmpty(arrayData) ? (
        <div className="w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-5 mt-2 items-center shadow-lg shadow-blue-200">
          <p className="text-[1.5rem]">Hours of Training Vs Target</p>
          <p>73,49%</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

import isEmpty from "lodash.isempty";
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";

type Props = {
  dataHeadCountByContractType: { LABEL: string; DATA: string | number }[];
  dataHeadCountByAgeRange: { LABEL: string; DATA: string | number }[];
};

const ChartPartHeadcountByAgeRange = ({ title, data }: any) => {
  return (
    <div className="w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
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
          }}
        />
      </div>
    </div>
  );
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

const SecondColumn = ({
  dataHeadCountByContractType,
  dataHeadCountByAgeRange,
}: Props) => {
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
        title="Headcount by Contract Type"
        labels={
          !isEmpty(dataHeadCountByContractType)
            ? dataHeadCountByContractType.map(
                (item) =>
                  `${
                    getTotal(dataHeadCountByContractType, item) +
                    " " +
                    item.LABEL
                  }`
              )
            : []
        }
        datasets={[
          {
            label: " Headcount",
            backgroundColor: (dataHeadCountByContractType ?? []).map(
              (item) => "#" + Math.floor(Math.random() * 16777215).toString(16)
            ),
            data: (dataHeadCountByContractType ?? []).map((item) => item.DATA),
          },
        ]}
      />
      {/* <ChartPartHeadcountByAgeRange
        data={dataHeadCountByAgeRange}
        title="Headcount By Age Range"
      /> */}
      <InformationPart arrayData={[]} />
    </div>
  );
};

export default SecondColumn;

const InformationPart = ({
    arrayData,
  }: {
    arrayData: { LABEL: string; DATA: string }[];
  }) => {
    return (
      <div className="w-full md:w-[49%] flex flex-col gap-[5px]">
        <div className="w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-5 mt-2 items-center shadow-lg shadow-blue-200">
          <p>Hours of Training Vs Target</p>
          <p>73,49%</p>
        </div>
        <div className="w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-5 mt-2 items-center shadow-lg shadow-blue-200">
          <p>Hours of Training Vs Target</p>
          <p>73,49%</p>
        </div>
      </div>
    );
  };

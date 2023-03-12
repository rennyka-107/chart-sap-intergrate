import User from "@/src/components/icons/User";
import UserPlus from "@/src/components/icons/UserPlus";
import UserTerminate from "@/src/components/icons/UserTerminate";
import useContract from "@/src/hooks/useContract";
import isEmpty from "lodash.isempty";
import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

type Props = {};

// const PIE_CHART = [
//   { COLOR: "#41B883", DATA: 40, LABEL: "VueJS" },
//   { COLOR: "#E46651", DATA: 20, LABEL: "EmberJS" },
//   { COLOR: "#00D8FF", DATA: 30, LABEL: "ReactJS" },
//   { COLOR: "#DD1B16", DATA: 10, LABEL: "AngularJS" },
// ];

// const BAR_CHART = [
//   { MONTH: "January", DATA: 40 },
//   { MONTH: "February", DATA: 20 },
//   { MONTH: "March", DATA: 12 },
//   { MONTH: "April", DATA: 39 },
//   { MONTH: "May", DATA: 10 },
//   { MONTH: "June", DATA: 40 },
//   { MONTH: "July", DATA: 39 },
// ];

const ChartBarPart = ({
  data,
}: {
  data: { LABEL: string; DATA: number }[];
}) => {
  return (
    <div className="flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">Headcount by Age range</p>
      <div className="w-full flex justify-center">
        <Bar
          data={{
            labels: data.map((item) => item.LABEL),
            datasets: [
              {
                label: "People",
                backgroundColor: data.map((item) => "#3e95cd"),

                // data: BAR_CHART.map((item) => item.DATA),
                data: data.map((item) => item.DATA),
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

const InformationPart = ({
  data,
}: {
  data: { LABEL: string; DATA: number }[];
}) => {
  return (
    <div className="flex border-[1px] border-blue-500 rounded-md p-3 shadow-lg shadow-blue-200">
      <div className="w-[33%] flex flex-col items-center gap-[5px]">
        <User />
        <p className="text-[2rem]">{data[0]?.DATA ?? 0}</p>
        <p>{data[0]?.LABEL ?? ""}</p>
      </div>
      <div className="w-[33%] flex flex-col items-center gap-[5px]">
        <UserPlus />
        <p className="text-[2rem]">{data[1]?.DATA ?? 0}</p>
        <p>{data[1]?.LABEL ?? ""}</p>
      </div>
      <div className="w-[33%] flex flex-col items-center gap-[5px]">
        <UserTerminate />
        <p className="text-[2rem]">{data[2]?.DATA ?? 0}</p>
        <p>{data[2]?.LABEL ?? ""}</p>
      </div>
    </div>
  );
};

const ChartPart = ({ labels, datasets, title }: any) => {
  return (
    <div className="flex flex-col border-[1px] border-blue-500 rounded-md p-1 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="m-0 p-0 font-semibold">{title}</p>
      <div className="w-120px flex justify-center">
        <Doughnut
          data={{
            labels,
            datasets,
            // labels: PIE_CHART.map((item) =>
            //   (item.DATA + "% " + item.LABEL).toString()
            // ),
            // datasets: [
            //   {
            //     label: "Population (millions)",
            //     backgroundColor: PIE_CHART.map((item) => item.COLOR),
            //     data: PIE_CHART.map((item) => item.DATA),
            //   },
            // ],
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

const LeftPart = (props: Props) => {
  const {
    detailHeadcount,
    contractTypeHeadcount,
    genderTypeHeadcount,
    ageRangeTypeHeadcount,
    getInitialData,
  } = useContract();

  useEffect(() => {
    getInitialData && getInitialData();
  }, [getInitialData]);

  return (
    <div className="mt-2">
      <InformationPart
        data={detailHeadcount.map((item) => ({
          ...item,
          DATA: Number(item.DATA),
        }))}
      />
      <ChartPart
        title="Headcount by Contract Type"
        labels={
          !isEmpty(contractTypeHeadcount)
            ? contractTypeHeadcount.map((item) => item.LABEL)
            : []
        }
        datasets={[
          {
            label: " ",
            backgroundColor: contractTypeHeadcount.map(
              (item) => item.COLOR
              //   Math.floor(Math.random() * 16777215).toString(16)
            ),
            data: contractTypeHeadcount.map((item) =>
              Number(item.DATA.toString().replace("%", ""))
            ),
          },
        ]}
      />
      <ChartPart
        title="Headcount by Gender"
        labels={
          !isEmpty(genderTypeHeadcount)
            ? genderTypeHeadcount.map((item) => item.LABEL)
            : []
        }
        datasets={[
          {
            label: " ",
            backgroundColor: genderTypeHeadcount.map((item) => item.COLOR),
            data: genderTypeHeadcount.map((item) =>
              Number(item.DATA.toString().replace("%", ""))
            ),
          },
        ]}
      />
      <ChartBarPart
        data={ageRangeTypeHeadcount.map((item) => ({
          ...item,
          DATA: Number(item.DATA.toString().replace("%", "")),
        }))}
      />
    </div>
  );
};

export default LeftPart;

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

type Props = {};

const ChartPartAverageScore = ({ title, data }: any) => {
  return (
    <div className="md:w-[33%] w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">{title}</p>
      <div className="w-full flex justify-center md:min-h-[200px] xl:min-h-[300px]">
        <Bar
          data={{
            labels: !isEmpty(data)
              ? data.map((item: TypeDetailAverageScore) => item.DEPARTMENT)
              : [],
            datasets: [
              {
                label: "Average score",
                backgroundColor: !isEmpty(data)
                  ? data.map(() => "#3e95cd")
                  : [],
                data: !isEmpty(data)
                  ? data.map((item: TypeDetailAverageScore) => item.SCORE)
                  : [],
              },
            ],
          }}
          options={{
            onClick: function (event, element) {
              console.log(element, "log bar");
            },
            maintainAspectRatio: false,
            responsive: true,
            indexAxis: "y",
            scales: {
              y: {
                // stackWeight: 0.5,
                ticks: {
                  // labelOffset: 100
                  autoSkip: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const ChartPartHeadcount = ({ title, data }: any) => {
  return (
    <div className="md:w-[33%] w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">{title}</p>
      <div className="w-full flex justify-center md:min-h-[200px] xl:min-h-[400px]">
        <Bar
          data={{
            labels: !isEmpty(data)
              ? data.map((item: TypeDetailHeadcount) => item.Z_POSITION)
              : [],
            datasets: [
              {
                label: "Headcount",
                backgroundColor: !isEmpty(data)
                  ? data.map(() => "#F06292")
                  : [],
                data: !isEmpty(data)
                  ? data.map((item: TypeDetailHeadcount) => item.HEADCOUNT)
                  : [],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            indexAxis: "y",
            scales: {
              y: {
                // stackWeight: 0.5,
                ticks: {
                  // labelOffset: 100
                  autoSkip: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const ChartPart = ({ labels, datasets, title }: any) => {
  return (
    <div className="md:w-[33%] w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-1 mt-2 items-center shadow-lg shadow-blue-200">
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

const TopChart = (props: Props) => {
  const {
    getInitialData,
    averageEmployeeScoreByDepartment,
    headcountByPosition,
  } = useSummaryChartBar();
  const { turnOn, turnOff } = useLoading();
  const {
    genderTypeHeadcount,
    getInitialData: getInitPie,
  } = useContract();

  useEffect(()=>{
    axios.get("/api/charts/odata").then(res=> console.log(res, "res json"));
  },[])

  useEffect(() => {
    getInitPie && getInitPie("2017");
  }, [getInitPie]);
  useEffect(() => {
    getInitialData && getInitialData("2017", turnOn, turnOff, turnOff);
  }, [getInitialData]);
  return (
    <div className="flex flex-wrap flex-col md:flex-row justify-around">
      <ChartPartAverageScore
        data={averageEmployeeScoreByDepartment}
        title="Average Employee Score By Department"
      />
      <ChartPartHeadcount
        data={headcountByPosition}
        title="Headcount By Position"
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
            backgroundColor: (genderTypeHeadcount ?? []).map(
              (item) => item.COLOR
            ),
            data: (genderTypeHeadcount ?? []).map((item) =>
              Number(item.DATA.toString().replace("%", ""))
            ),
          },
        ]}
      />
      {/* <ChartPartSickLeave title="Total Salary Expenses By Department" /> */}
    </div>
  );
};

export default TopChart;

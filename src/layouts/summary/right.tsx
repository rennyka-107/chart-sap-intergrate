import useLoading from "@/src/hooks/useLoading";
import useSummaryChartBar, {
  TypeDetailAverageScore,
  TypeDetailHeadcount,
  TypeDetailSickVocationLeave,
} from "@/src/hooks/useSummaryChartBar";
import isEmpty from "lodash.isempty";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

type Props = {
  year: string;
};

const BAR_CHART = [
  { MONTH: "January", DATA: 40 },
  { MONTH: "February", DATA: 20 },
  { MONTH: "March", DATA: 12 },
  { MONTH: "April", DATA: 39 },
  { MONTH: "May", DATA: 10 },
  { MONTH: "June", DATA: 40 },
  { MONTH: "July", DATA: 39 },
];

const ChartPartSickLeave = ({ title, data }: any) => {
  return (
    <div className="md:w-[49%] w-full flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
      <p className="font-semibold">{title}</p>
      <div className="w-full flex justify-center md:min-h-[200px] xl:min-h-[300px]">
        <Bar
          data={{
            labels: !isEmpty(data)
              ? data.map((item: TypeDetailSickVocationLeave) => item.YEAR)
              : [],
            datasets: [
              {
                label: "Sick leave",
                backgroundColor: !isEmpty(data)
                  ? data.map(() => "#3e95cd")
                  : [],
                data: !isEmpty(data)
                  ? data.map((item: TypeDetailSickVocationLeave) => item.SICK)
                  : [],
              },
              {
                label: "Vocation leave",
                backgroundColor: !isEmpty(data)
                  ? data.map(() => "#0D47A1 ")
                  : [],
                data: !isEmpty(data)
                  ? data.map(
                      (item: TypeDetailSickVocationLeave) => item.VOCATION
                    )
                  : [],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
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

const ChartPartAverageScore = ({ title, data }: any) => {
  return (
    <div className="md:w-[49%] w-full flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
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
    <div className="md:w-[49%] w-full flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
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

const RightPart = ({ year }: Props) => {
  const {
    getInitialData,
    sickVocationLeave,
    averageEmployeeScoreByDepartment,
    headcountByPosition,
    // totalSalaryExpensesByDepartment,
  } = useSummaryChartBar();
  const { turnOn, turnOff } = useLoading();
  useEffect(() => {
    getInitialData && getInitialData(year, turnOn, turnOff, turnOff);
  }, [getInitialData, year]);

  return (
    <div className="flex flex-wrap flex-col md:flex-row justify-around">
      <ChartPartSickLeave
        data={sickVocationLeave}
        title="Sick Leave & Vocation Leave By Year"
      />
      <ChartPartAverageScore
        data={averageEmployeeScoreByDepartment}
        title="Average Employee Score By Department"
      />
      <ChartPartHeadcount
        data={headcountByPosition}
        title="Headcount By Position"
      />
      {/* <ChartPartSickLeave title="Total Salary Expenses By Department" /> */}
    </div>
  );
};

export default RightPart;

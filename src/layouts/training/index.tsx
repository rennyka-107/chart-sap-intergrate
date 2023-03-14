import useChartData from "@/src/hooks/useChartData";
import useLoading from "@/src/hooks/useLoading";
import isEmpty from "lodash.isempty";
import React, { useEffect, useState } from "react";
import FirstColumn from "./first-column";
import HeadPart from "./head";
import Information from "./information";
import SecondColumn from "./second-column";
import ThirdColumn from "./third-column";

type Props = {};

const Training = (props: Props) => {
  const [currentYear, setCurrentYear] = useState<string>("");
  const {
    getInitialData,
    filterDataByYear,
    trainingTotalCostOverview,
    trainingTotalCostByProgram,
    trainingType,
    trainingDepartment,
  } = useChartData();

  useEffect(() => {
    getInitialData && getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    if (
      !isEmpty(trainingTotalCostOverview) ||
      !isEmpty(trainingTotalCostByProgram) ||
      !isEmpty(trainingType) ||
      !isEmpty(trainingDepartment)
    )
      filterDataByYear(currentYear);
  }, [
    currentYear,
    trainingTotalCostOverview,
    trainingTotalCostByProgram,
    trainingType,
    trainingDepartment,
  ]);
  return (
    <div>
      <HeadPart currentYear={currentYear} setCurrentYear={setCurrentYear} />
      <Information />
      <div className="flex flex-col justify-around md:flex-row">
        <div className="md:w-[32%] w-[100%]">
          <FirstColumn />
        </div>
        <div className="flex flex-col justify-between md:w-[65%] w-[100%]">
          <div>
            <SecondColumn />
          </div>
          <div>
            <ThirdColumn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;

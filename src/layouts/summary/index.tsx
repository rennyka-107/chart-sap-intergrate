import useChartData from "@/src/hooks/useChartData";
import isEmpty from "lodash.isempty";
import React, { useEffect, useState } from "react";
import HeadPart from "./head";
import LeftPart from "./left";
import RightPart from "./right";

type Props = {};

const Summary = (props: Props) => {
  const [currentYear, setCurrentYear] = useState<string>("");
  const {
    getInitialData,
    overviewHeadcountByPosition,
    filterDataByYear,
    overviewHeadcountByDepartment,
    overviewHeadcountByAgeRange,
    overviewHeadcountByEducation,
    overviewHeadcountByContractType,
    overviewHeadcountByHire,
    overviewHeadcountDemographic,
    summaryAverageScore,
    summarySickVocationLeave,
    summaryTotalSalary,
  } = useChartData();

  useEffect(() => {
    getInitialData && getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    if (
      !isEmpty(overviewHeadcountByPosition) ||
      !isEmpty(overviewHeadcountByDepartment) ||
      !isEmpty(overviewHeadcountByAgeRange) ||
      !isEmpty(overviewHeadcountByEducation) ||
      !isEmpty(overviewHeadcountByContractType) ||
      !isEmpty(overviewHeadcountByHire) ||
      !isEmpty(overviewHeadcountDemographic) ||
      !isEmpty(summaryAverageScore) ||
      !isEmpty(summarySickVocationLeave) ||
      !isEmpty(summaryTotalSalary)
    )
      filterDataByYear(currentYear);
  }, [
    currentYear,
    overviewHeadcountByPosition,
    overviewHeadcountByDepartment,
    overviewHeadcountByAgeRange,
    overviewHeadcountByEducation,
    overviewHeadcountByContractType,
    overviewHeadcountByHire,
    overviewHeadcountDemographic,
    summaryAverageScore,
    summarySickVocationLeave,
    summaryTotalSalary
  ]);
  return (
    <div>
      <HeadPart currentYear={currentYear} setCurrentYear={setCurrentYear} />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
        <div className="lg:w-[25%] w-[90%]">
          <LeftPart year={currentYear} />
        </div>
        <div className="lg:w-[74%] w-[90%]">
          <RightPart year={currentYear} />
        </div>
      </div>
    </div>
  );
};

export default Summary;

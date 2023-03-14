import useChartData from "@/src/hooks/useChartData";
import isEmpty from "lodash.isempty";
import React, { useEffect, useState } from "react";
import HeadPart, { ArrayYear } from "./head";
import LeftPart from "./left";
import RightPart from "./right";

type Props = {};

const Summary = (props: Props) => {
  const [currentYear, setCurrentYear] = useState<string>(ArrayYear[0]);
  const {
    getInitialData,
    overviewHeadcountByPositionFilter,
    overviewHeadcountByPosition,
    filterDataByYear,
    overviewHeadcountByDepartment,
    overviewHeadcountByDepartmentFilter,
    overviewHeadcountByAgeRange,
    overviewHeadcountByAgeRangeFilter,
    overviewHeadcountByEducation,
    overviewHeadcountByEducationFilter,
    overviewHeadcountByContractType,
    overviewHeadcountByContractTypeFilter,
    overviewHeadcountByHire,
    overviewHeadcountByHireFilter,
    overviewHeadcountDemographic,
    overviewHeadcountDemographicFilter,
  } = useChartData();

  useEffect(() => {
    getInitialData && getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    if (
      (!isEmpty(currentYear) && !isEmpty(overviewHeadcountByPosition)) ||
      (!isEmpty(currentYear) && !isEmpty(overviewHeadcountByDepartment)) ||
      (!isEmpty(currentYear) && !isEmpty(overviewHeadcountByAgeRange)) ||
      (!isEmpty(currentYear) && !isEmpty(overviewHeadcountByEducation)) ||
      (!isEmpty(currentYear) && !isEmpty(overviewHeadcountByContractType)) ||
      (!isEmpty(currentYear) && !isEmpty(overviewHeadcountByHire)) ||
      (!isEmpty(currentYear) && !isEmpty(overviewHeadcountDemographic))
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

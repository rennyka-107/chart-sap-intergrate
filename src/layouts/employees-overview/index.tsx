import useChartData from "@/src/hooks/useChartData";
import isEmpty from "lodash.isempty";
import React, { useEffect, useState } from "react";
import BotChart from "./bot-chart";
import HeadPart from "./head";
import Information from "./information";
import RightInformation from "./right-information";
import TopChart from "./top-chart";

type Props = {};

const EmployeesOverview = (props: Props) => {
  const [currentYear, setCurrentYear] = useState<string>("2017");
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
    overviewHeadcountByContractTypeFilter
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
      (!isEmpty(currentYear) && !isEmpty(overviewHeadcountByContractType))
    )
      filterDataByYear(currentYear);
  }, [
    currentYear,
    overviewHeadcountByPosition,
    overviewHeadcountByDepartment,
    overviewHeadcountByAgeRange,
    overviewHeadcountByEducation,
    overviewHeadcountByContractType
  ]);

  return (
    <div>
      <HeadPart currentYear={currentYear} setCurrentYear={setCurrentYear} />
      <div className="flex mt-2">
        <div className="w-[50vw] md:w-[75vw] flex flex-col">
          <Information />
          <TopChart
            dataHeadCountByAgeRange={overviewHeadcountByAgeRangeFilter}
            dataHeadCountByEducation={overviewHeadcountByEducationFilter}
            dataHeadCountByContractType={overviewHeadcountByContractTypeFilter}
          />
        </div>
        <div className="w-[50vw] md:w-[23vw] flex justify-center">
          <RightInformation />
        </div>
      </div>
      <BotChart
        dataHeadCountByPosition={overviewHeadcountByPositionFilter}
        dataHeadCountByDepartment={overviewHeadcountByDepartmentFilter}
      />
    </div>
  );
};

export default EmployeesOverview;

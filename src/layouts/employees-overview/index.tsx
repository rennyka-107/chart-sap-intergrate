import useChartData from "@/src/hooks/useChartData";
import useLoading from "@/src/hooks/useLoading";
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
    overviewHeadcountByContractTypeFilter,
    overviewHeadcountByHire,
    overviewHeadcountByHireFilter,
    overviewHeadcountDemographic,
    overviewHeadcountDemographicFilter,
    summaryAverageScore,
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
      (!isEmpty(currentYear) && !isEmpty(overviewHeadcountDemographic)) ||
      (!isEmpty(currentYear) && !isEmpty(summaryAverageScore))
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
  ]);

  return (
    <div>
      <HeadPart currentYear={currentYear} setCurrentYear={setCurrentYear} />
      <div className="w-[100%] flex flex-col gap-[1rem] lg:gap-0 lg:flex-row mt-2 justify-between">
        <div className="w-[100%] lg:w-[77%] flex flex-col">
          <Information dataHeadCountByHire={overviewHeadcountByHireFilter} />
          <TopChart
            dataHeadCountByAgeRange={overviewHeadcountByAgeRangeFilter}
            dataHeadCountByEducation={overviewHeadcountByEducationFilter}
            dataHeadCountByContractType={overviewHeadcountByContractTypeFilter}
          />
        </div>
        <div className="w-[100%] lg:w-[20%] flex justify-center">
          <RightInformation
            dataHeadcountDemographic={overviewHeadcountDemographicFilter}
          />
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

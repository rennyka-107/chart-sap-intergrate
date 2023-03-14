import useChartData from "@/src/hooks/useChartData";
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
      !isEmpty(overviewHeadcountByPosition) ||
      !isEmpty(overviewHeadcountByDepartment) ||
      !isEmpty(overviewHeadcountByAgeRange) ||
      !isEmpty(overviewHeadcountByEducation) ||
      !isEmpty(overviewHeadcountByContractType) ||
      !isEmpty(overviewHeadcountByHire) ||
      !isEmpty(overviewHeadcountDemographic)
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
      <Information dataHeadCountByHire={overviewHeadcountByHireFilter} />
      <div className="flex flex-col justify-between md:flex-row">
        <div className="w-[32%]">
          <FirstColumn
            dataHeadCountByDepartment={overviewHeadcountByDepartmentFilter}
          />
        </div>
        <div className="flex flex-col justify-between w-[65%]">
          <div>
            <SecondColumn
              dataHeadCountByAgeRange={overviewHeadcountByAgeRangeFilter}
              dataHeadCountByContractType={
                overviewHeadcountByContractTypeFilter
              }
            />
          </div>
          <div>
            <ThirdColumn
              dataHeadCountByAgeRange={overviewHeadcountByAgeRangeFilter}
              dataHeadCountByContractType={
                overviewHeadcountByContractTypeFilter
              }
            />
          </div>
        </div>
        {/* <div className="flex flex-col justify-between w-[32%]">
          <ThirdColumn
            dataHeadCountByAgeRange={overviewHeadcountByAgeRangeFilter}
            dataHeadCountByContractType={overviewHeadcountByContractTypeFilter}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Training;

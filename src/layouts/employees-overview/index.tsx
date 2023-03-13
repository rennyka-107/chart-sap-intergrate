import useChartData from "@/src/hooks/useChartData";
import isEmpty from "lodash.isempty";
import React, { useEffect, useState } from "react";
import BotChart from "./bot-chart";
import HeadPart, { ArrayYear } from "./head";
import Information from "./information";
import LeftPart from "./left";
import RightPart from "./right";
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
  } = useChartData();

  useEffect(() => {
    getInitialData && getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    if (!isEmpty(currentYear) && overviewHeadcountByPosition) filterDataByYear(currentYear);
  }, [currentYear, overviewHeadcountByPosition]);

  return (
    <div>
      <HeadPart currentYear={currentYear} setCurrentYear={setCurrentYear} />
      <div className="flex mt-2">
        <div className="w-[50vw] md:w-[75vw] flex flex-col">
          <Information />
          <TopChart />
        </div>
        <div className="w-[50vw] md:w-[23vw] flex justify-center">
          <RightInformation />
        </div>
      </div>
      <BotChart dataHeadCountByPosition={overviewHeadcountByPositionFilter} />
    </div>
  );
};

export default EmployeesOverview;

import React, { useState } from "react";
import HeadPart, { ArrayYear } from "./head";
import LeftPart from "./left";
import RightPart from "./right";

type Props = {};

const EmployeesOverview = (props: Props) => {
  const [currentYear, setCurrentYear] = useState<string>(ArrayYear[0]);
  return (
    <div>
      <HeadPart currentYear={currentYear} setCurrentYear={setCurrentYear} />
      <div>
        
      </div>
      <div>
        <div>

        </div>
        <div>

        </div>
      </div>
      {/* <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
        <div className="lg:w-[25%] w-[90%]">
          <LeftPart year={currentYear} />
        </div>
        <div className="lg:w-[74%] w-[90%]">
          <RightPart year={currentYear} />
        </div>
      </div> */}
    </div>
  );
};

export default EmployeesOverview;

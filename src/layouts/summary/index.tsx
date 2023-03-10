import React from "react";
import HeadPart from "./head";
import LeftPart from "./left";
import RightPart from "./right";

type Props = {};

const Summary = (props: Props) => {
  return (
    <div>
      <HeadPart />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
        <div className="lg:w-[25%] w-[90%]">
          <LeftPart />
        </div>
        <div className="lg:w-[74%] w-[90%]">
          <RightPart />
        </div>
      </div>
    </div>
  );
};

export default Summary;

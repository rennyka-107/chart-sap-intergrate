import React from "react";
import HeadPart from "./head";
import LeftPart from "./left";
import RightPart from "./right";

type Props = {};

const Summary = (props: Props) => {
  return (
    <div>
      <HeadPart />
      <div className="flex justify-between">
        <div className="w-[25%]">
          <LeftPart />
        </div>
        <div className="w-[74%]">
          <RightPart />
        </div>
      </div>
    </div>
  );
};

export default Summary;

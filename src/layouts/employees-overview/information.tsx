import React from "react";

type Props = {};

const Information = (props: Props) => {
  return (
    <div className="flex gap-[1rem] w-full justify-center">
      <div className="px-[2rem] flex flex-col items-center border-[1px] border-blue-500 rounded-md p-3 shadow-lg shadow-blue-200">
        <p className="text-[1.5rem]">Headcount</p>
        <p>193</p>
      </div>
      <div className="px-[2rem] flex flex-col items-center border-[1px] border-blue-500 rounded-md p-3 shadow-lg shadow-blue-200">
        <p className="text-[1.5rem]">Hires</p>
        <p>193</p>
      </div>
      <div className="px-[2rem] flex flex-col items-center border-[1px] border-blue-500 rounded-md p-3 shadow-lg shadow-blue-200">
        <p className="text-[1.5rem]">Terminations</p>
        <p>193</p>
      </div>
      <div className="px-[2rem] flex flex-col items-center border-[1px] border-blue-500 rounded-md p-3 shadow-lg shadow-blue-200">
        <p className="text-[1.5rem]">Turnover Rate</p>
        <p>193</p>
      </div>
    </div>
  );
};

export default Information;

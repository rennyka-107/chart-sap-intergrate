import React from "react";
import Image from "next/image";
import Male from "@/src/components/icons/Male";
import Female from "@/src/components/icons/Female";

type Props = {};

const RightInformation = (props: Props) => {
  return (
    <div className="w-full flex flex-col items-center border border-blue-400 rounded-md">
      <p className="text-[1.2rem] py:-[1rem] md:py-[2rem] italic font-semibold">
        Demographic
      </p>
      <hr className="w-full" />
      <div className="flex gap-[1rem] py:-[1rem]">
        <Male />
        <div className="flex flex-col justify-center">
          <p className="text-pink-400 font-bold">Female</p>
          <p className="font-semibold">50.78%</p>
        </div>
      </div>
      <div className="flex gap-[1rem] pb-[1rem]">
        <Female />
        <div className="flex flex-col justify-center">
          <p className="text-blue-400 font-bold">Male</p>
          <p className="font-semibold">49.22%</p>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col items-center justify-center gap-[1rem] py-[1rem]">
        <p className="text-[1.2rem] italic font-semibold">Avg. Age</p>
        <p className="text-[3rem]">35</p>
      </div>
    </div>
  );
};

export default RightInformation;

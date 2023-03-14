import React from "react";
import Male from "@/src/components/icons/Male";
import Female from "@/src/components/icons/Female";

type Props = {
  dataHeadcountDemographic: { LABEL: string; DATA: number | string }[];
};

const RightInformation = ({ dataHeadcountDemographic }: Props) => {
  return (
    <div className="w-full flex flex-col items-center border border-blue-400 rounded-md">
      <p className="text-[1.2rem] py:-[1rem] lg:py-[2rem] italic font-semibold">
        Demographic
      </p>
      <hr className="w-full" />
      <div className="flex gap-[1rem] py:-[1rem]">
        <Male />
        <div className="flex flex-col justify-center">
          <p className="text-pink-400 font-bold">
            {dataHeadcountDemographic?.find(
              (item: { LABEL: string; DATA: number | string }) =>
                item.LABEL === "Female"
            )?.LABEL ?? ""}
          </p>
          <p className="font-semibold">
            {dataHeadcountDemographic?.find(
              (item: { LABEL: string; DATA: number | string }) =>
                item.LABEL === "Female"
            )?.DATA ?? "0"}
            %
          </p>
        </div>
      </div>
      <div className="flex gap-[1rem] pb-[1rem]">
        <Female />
        <div className="flex flex-col justify-center">
          <p className="text-blue-400 font-bold">
            {dataHeadcountDemographic?.find(
              (item: { LABEL: string; DATA: number | string }) =>
                item.LABEL === "Male"
            )?.LABEL ?? ""}
          </p>
          <p className="font-semibold">
            {dataHeadcountDemographic?.find(
              (item: { LABEL: string; DATA: number | string }) =>
                item.LABEL === "Male"
            )?.DATA ?? "0"}
            %
          </p>
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col items-center justify-center gap-[1rem] py-[1rem]">
        <p className="text-[1.2rem] italic font-semibold">
          {dataHeadcountDemographic?.find(
            (item: { LABEL: string; DATA: number | string }) =>
              item.LABEL === "Avg. Age"
          )?.LABEL ?? ""}
        </p>
        <p className="text-[3rem]">
          {dataHeadcountDemographic?.find(
            (item: { LABEL: string; DATA: number | string }) =>
              item.LABEL === "Avg. Age"
          )?.DATA ?? "0"}
        </p>
      </div>
    </div>
  );
};

export default RightInformation;

import React from "react";

type Props = {
  dataHeadCountByHire: { LABEL: string; DATA: number | string }[];
};

const Information = ({ dataHeadCountByHire }: Props) => {
  return (
    <div className="flex gap-[1rem] w-full justify-center flex-wrap">
      {(dataHeadCountByHire ?? []).map(
        (item: { LABEL: string; DATA: number | string }) => (
          <div
            key={item.LABEL + item.DATA}
            className="px-[1rem] md:px-[2rem] flex flex-col items-center border-[1px] border-blue-500 rounded-md p-3 shadow-lg shadow-blue-200"
          >
            <p className="text-[1.5rem]">{item.LABEL}</p>
            <p>{item.DATA}{item.LABEL === "Turnover Rate" ? "%" : ""}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Information;

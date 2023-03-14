import useChartData from "@/src/hooks/useChartData";
import React from "react";

type Props = {
  currentYear: string;
  setCurrentYear: React.Dispatch<React.SetStateAction<string>>;
};

export const ArrayYear = ["2017", "2018", "2019", "2020"];

const HeadPart = ({ currentYear, setCurrentYear }: Props) => {
  return (
    <div className="flex w-full flex-col md:flex-row justify-between items-center">
      <h1 className="text-[1rem] md:text-[2rem] w-full italic text-blue-500 text-center">
        Training
      </h1>
      <div className="border-[1px] border-blue-300 rounded-lg p-5 flex gap-[5px] md:flex-nowrap flex-wrap">
        {ArrayYear.map((item) => (
          <button
            onClick={() => {
              if (item === currentYear) {
                setCurrentYear("");
              } else setCurrentYear(item);
            }}
            key={item}
            className={`hover:bg-blue-400 text-white ${
              currentYear === item ? "bg-blue-500" : "bg-blue-300"
            } px-5 py-2 rounded-lg`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeadPart;

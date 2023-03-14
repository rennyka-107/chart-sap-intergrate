import isEmpty from 'lodash.isempty';
import React from 'react'
import { Bar } from 'react-chartjs-2';

type Props = {
    dataHeadCountByDepartment: {LABEL: string, DATA: string | number}[]
}

const ChartPartHeadcountByDepartment = ({ title, data }: any) => {
    return (
      <div className="w-full justify-center flex flex-col border-[1px] border-blue-500 rounded-md p-3 mt-2 items-center shadow-lg shadow-blue-200">
        <p className="font-semibold">{title}</p>
        <div className="w-full flex justify-center lg:min-h-[200px] xl:min-h-[400px]">
        <Bar
            data={{
              labels: !isEmpty(data)
                ? data.map((item: { LABEL: string; DATA: number }) => item.LABEL)
                : [],
              datasets: [
                {
                  label: "Headcount",
                  backgroundColor: !isEmpty(data)
                    ? data.map(() => "#76eec6")
                    : [],
                  data: !isEmpty(data)
                    ? data.map(
                        (item: { LABEL: string; DATA: number }) => item.DATA
                      )
                    : [],
                },
              ],
            }}
            options={{
              // onClick: function (event, element) {
              //   console.log(element, "log bar");
              // },
              indexAxis: "y",
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
      </div>
    );
  };

const FirstColumn = ({dataHeadCountByDepartment}: Props) => {
  return (
    <ChartPartHeadcountByDepartment
    data={dataHeadCountByDepartment}
    title="Total Training Cost By Training Program"
  />
  )
}

export default FirstColumn
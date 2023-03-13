import axios from "axios";
import { create } from "zustand";
import isEmpty from "lodash.isempty";

type TypeDetailHeadcount = {
  COLOR: string;
  DATA: number | string;
  LABEL: string;
};

type TypeOVHeadCountByPosition = {
  YEAR: string;
  DATA: {
    LABEL: string;
    DATA: number;
  }[];
};

type StateContract = {
  detailHeadcount: TypeDetailHeadcount[];
  contractTypeHeadcount: TypeDetailHeadcount[];
  genderTypeHeadcount: TypeDetailHeadcount[];
  ageRangeTypeHeadcount: TypeDetailHeadcount[];
  getInitialData: () => void;

  overviewHeadcountByPosition: TypeOVHeadCountByPosition[];
  overviewHeadcountByPositionFilter: { LABEL: string; DATA: number }[];
  filterDataByYear: (year: string) => void;
  overviewHeadcountDataAll : {LABEL: string, DATA: number}[];
};

const useChartData = create<StateContract>((set) => ({
  detailHeadcount: [],
  contractTypeHeadcount: [],
  genderTypeHeadcount: [],
  ageRangeTypeHeadcount: [],
  overviewHeadcountDataAll: [],
  getInitialData: async () => {
    try {
      const res = await axios.get(`/api/charts/employees-overview/headcount-by-position`);
      console.log(res, "res contract");
      if (!isEmpty(res.data)) {
        set((state: StateContract) => ({
          ...state,
          overviewHeadcountByPosition: res.data?.data,
          overviewHeadcountDataAll: res.data?.dataAll,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },
  overviewHeadcountByPosition: [],
  overviewHeadcountByPositionFilter: [],
  filterDataByYear: (year?: string) => {
    set((state: StateContract) => ({
      ...state,
      overviewHeadcountByPositionFilter: !isEmpty(year) ?
        state.overviewHeadcountByPosition.find(
          (item: TypeOVHeadCountByPosition) => item.YEAR === year
        )?.DATA ?? [] : state.overviewHeadcountDataAll,
    }));
  },
  //   turnOn: () => set((state: StateLoading) => ({ ...state, status: true })),
}));

export default useChartData;

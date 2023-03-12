import axios from "axios";
import { create } from "zustand";
import isEmpty from "lodash.isempty";

type TypeDetail = {
  COLOR: string;
  DATA: number | string;
  LABEL: string;
};

export type TypeDetailSickVocationLeave = {
  YEAR: string;
  YEAR1: string;
  SICK: number;
  VOCATION: number;
};

export type TypeDetailAverageScore = {
  YEAR: string;
  DEPARTMENT: string;
  SCORE: number;
  Z_YEAR: string;
};

export type TypeDetailHeadcount = {
  Z_YEAR: string;
  Z_POSITION: string;
  HEADCOUNT: number;
};

type State = {
  sickVocationLeave: TypeDetailSickVocationLeave[];
  averageEmployeeScoreByDepartment: TypeDetailAverageScore[];
  headcountByPosition: TypeDetailHeadcount[];
  totalSalaryExpensesByDepartment: TypeDetail[];
  getInitialData: (year?: string) => void;
};

const useSummaryChartBar = create<State>((set) => ({
  sickVocationLeave: [],
  averageEmployeeScoreByDepartment: [],
  headcountByPosition: [],
  totalSalaryExpensesByDepartment: [],
  getInitialData: async (year?: string) => {
    try {
      const resSickVocationLeave = await axios.get(
        `/api/charts/sick-vocation-leave${
          !isEmpty(year) ? "?year=" + year : ""
        }`
      );
      const resAverageEmployeeScoreByDepartment = await axios.get(
        "/api/charts/point-job"
      );
      const resHeadcountByPosition = await axios.get("/api/charts/headcount");
      // const resTotalSalaryExpensesByDepartment = await axios.get(
      //   "/api/charts/sick-vocation-leave"
      // );
      if (!isEmpty(resSickVocationLeave.data)) {
        set((state: State) => ({
          ...state,
          sickVocationLeave: resSickVocationLeave.data ?? [],
        }));
      }
      if (!isEmpty(resAverageEmployeeScoreByDepartment.data)) {
        set((state: State) => ({
          ...state,
          averageEmployeeScoreByDepartment:
            resAverageEmployeeScoreByDepartment.data ?? [],
        }));
      }
      if (!isEmpty(resHeadcountByPosition.data)) {
        set((state: State) => ({
          ...state,
          headcountByPosition: resHeadcountByPosition.data ?? [],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },
  //   turnOn: () => set((state: StateLoading) => ({ ...state, status: true })),
}));

export default useSummaryChartBar;

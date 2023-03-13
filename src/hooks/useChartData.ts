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
  filterDataByYear: (year: string) => void;
  //headcount by position
  overviewHeadcountByPosition: TypeOVHeadCountByPosition[];
  overviewHeadcountByPositionFilter: { LABEL: string; DATA: number }[];
  overviewHeadcountPositionDataAll: { LABEL: string; DATA: number }[];
  //headcount by department
  overviewHeadcountByDepartment: TypeOVHeadCountByPosition[];
  overviewHeadcountByDepartmentFilter: { LABEL: string; DATA: number }[];
  overviewHeadcountDepartmentDataAll: { LABEL: string; DATA: number }[];
  //headcount by age range
  overviewHeadcountByAgeRange: TypeOVHeadCountByPosition[];
  overviewHeadcountByAgeRangeFilter: { LABEL: string; DATA: number }[];
  overviewHeadcountAgeRangeDataAll: { LABEL: string; DATA: number }[];
  //headcount by education
  overviewHeadcountByEducation: TypeOVHeadCountByPosition[];
  overviewHeadcountByEducationFilter: { LABEL: string; DATA: number }[];
  overviewHeadcountEducationDataAll: { LABEL: string; DATA: number }[];
  //headcout by contract type
  overviewHeadcountByContractType: TypeOVHeadCountByPosition[];
  overviewHeadcountByContractTypeFilter: { LABEL: string; DATA: number }[];
  overviewHeadcountContractTypeDataAll: { LABEL: string; DATA: number }[];
};

const useChartData = create<StateContract>((set) => ({
  detailHeadcount: [],
  contractTypeHeadcount: [],
  genderTypeHeadcount: [],
  ageRangeTypeHeadcount: [],
  overviewHeadcountByPosition: [],
  overviewHeadcountByPositionFilter: [],
  overviewHeadcountPositionDataAll: [],
  overviewHeadcountByDepartment: [],
  overviewHeadcountByDepartmentFilter: [],
  overviewHeadcountDepartmentDataAll: [],
  overviewHeadcountByAgeRange: [],
  overviewHeadcountByAgeRangeFilter: [],
  overviewHeadcountAgeRangeDataAll: [],
  overviewHeadcountByEducation: [],
  overviewHeadcountByEducationFilter: [],
  overviewHeadcountEducationDataAll: [],
  overviewHeadcountByContractType: [],
  overviewHeadcountByContractTypeFilter: [],
  overviewHeadcountContractTypeDataAll: [],
  getInitialData: async () => {
    try {
      const res1 = await axios.get(
        `/api/charts/employees-overview/headcount-by-position`
      );
      const res2 = await axios.get(
        `/api/charts/employees-overview/headcount-by-department`
      );
      const res3 = await axios.get(
        `/api/charts/employees-overview/headcount-by-age-range`
      );
      const res4 = await axios.get(
        `/api/charts/employees-overview/headcount-by-education`
      );
      const res5 = await axios.get(
        `/api/charts/employees-overview/headcount-by-contract-type`
      );
      set((state: StateContract) => ({
        ...state,
        overviewHeadcountByPosition: !isEmpty(res1.data) ? res1.data?.data : [],
        overviewHeadcountPositionDataAll: !isEmpty(res1.data)
          ? res1.data?.dataAll
          : [],
        overviewHeadcountByDepartment: !isEmpty(res2.data)
          ? res2.data?.data
          : [],
        overviewHeadcountDepartmentDataAll: !isEmpty(res2.data)
          ? res2.data?.dataAll
          : [],
        overviewHeadcountByAgeRange: !isEmpty(res3.data) ? res3.data?.data : [],
        overviewHeadcountAgeRangeDataAll: !isEmpty(res3.data)
          ? res3.data?.dataAll
          : [],
        overviewHeadcountByEducation: !isEmpty(res4.data)
          ? res4.data?.data
          : [],
        overviewHeadcountEducationDataAll: !isEmpty(res4.data)
          ? res4.data?.dataAll
          : [],
        overviewHeadcountByContractType: !isEmpty(res5.data)
          ? res5.data?.data
          : [],
        overviewHeadcountContractTypeDataAll: !isEmpty(res5.data)
          ? res5.data?.dataAll
          : [],
      }));
    } catch (err) {
      console.log(err);
    }
  },
  filterDataByYear: (year?: string) => {
    set((state: StateContract) => {
      return {
        ...state,
        overviewHeadcountByPositionFilter: !isEmpty(year)
          ? state.overviewHeadcountByPosition.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.overviewHeadcountPositionDataAll,
        overviewHeadcountByDepartmentFilter: !isEmpty(year)
          ? state.overviewHeadcountByDepartment.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.overviewHeadcountDepartmentDataAll,
        overviewHeadcountByAgeRangeFilter: !isEmpty(year)
          ? state.overviewHeadcountByAgeRange.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.overviewHeadcountAgeRangeDataAll,
        overviewHeadcountByEducationFilter: !isEmpty(year)
          ? state.overviewHeadcountByEducation.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.overviewHeadcountEducationDataAll,
        overviewHeadcountByContractTypeFilter: !isEmpty(year)
          ? state.overviewHeadcountByContractType.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.overviewHeadcountContractTypeDataAll,
      };
    });
  },
}));

export default useChartData;

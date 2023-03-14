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
  getInitialData: (turnLoading?: () => void, offLoading?: () => void) => void;
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
  //headcount by hire
  overviewHeadcountByHire: TypeOVHeadCountByPosition[];
  overviewHeadcountByHireFilter: { LABEL: string; DATA: number }[];
  overviewHeadcountHireDataAll: { LABEL: string; DATA: number }[];
  //headcount by hire demographic
  overviewHeadcountDemographic: TypeOVHeadCountByPosition[];
  overviewHeadcountDemographicFilter: { LABEL: string; DATA: number }[];
  overviewHeadcountDemographicDataAll: { LABEL: string; DATA: number }[];
  //average employee score by department
  summaryAverageScore: TypeOVHeadCountByPosition[];
  summaryAverageScoreFilter: { LABEL: string; DATA: number }[];
  summaryAverageScoreDataAll: { LABEL: string; DATA: number }[];
  //average employee score by department
  summaryTotalSalary: TypeOVHeadCountByPosition[];
  summaryTotalSalaryFilter: { LABEL: string; DATA: number }[];
  summaryTotalSalaryDataAll: { LABEL: string; DATA: number }[];
  //training total cost
  trainingTotalCostOverview: TypeOVHeadCountByPosition[];
  trainingTotalCostOverviewFilter: { LABEL: string; DATA: number }[];
  trainingTotalCostOverviewDataAll: { LABEL: string; DATA: number }[];
  //training total cost by program
  trainingTotalCostByProgram: TypeOVHeadCountByPosition[];
  trainingTotalCostByProgramFilter: { LABEL: string; DATA: number }[];
  trainingTotalCostByProgramDataAll: { LABEL: string; DATA: number }[];
  //training type
  trainingType: TypeOVHeadCountByPosition[];
  trainingTypeFilter: { LABEL: string; DATA: number }[];
  trainingTypeDataAll: { LABEL: string; DATA: number }[];
  //training total cost by department
  trainingDepartment: TypeOVHeadCountByPosition[];
  trainingDepartmentFilter: { LABEL: string; DATA: number }[];
  trainingDepartmentDataAll: { LABEL: string; DATA: number }[];
  // total
  trainingCalTotal: { YEAR: string; DATA: number }[];
  //sick and vocation leave
  summarySickVocationLeave: {
    YEAR: string;
    SICK: string | number;
    VOCATION: string | number;
  }[];
  summarySickVocationLeaveFilter: {
    YEAR: string;
    SICK: string | number;
    VOCATION: string | number;
  }[];
  summarySickVocationLeaveDataAll: {
    YEAR: string;
    SICK: string | number;
    VOCATION: string | number;
  }[];
};

const useChartData = create<StateContract>((set) => ({
  detailHeadcount: [],
  contractTypeHeadcount: [],
  genderTypeHeadcount: [],
  ageRangeTypeHeadcount: [],
  // headcount by position
  overviewHeadcountByPosition: [],
  overviewHeadcountByPositionFilter: [],
  overviewHeadcountPositionDataAll: [],
  // headcount by department
  overviewHeadcountByDepartment: [],
  overviewHeadcountByDepartmentFilter: [],
  overviewHeadcountDepartmentDataAll: [],
  // headcount by age range
  overviewHeadcountByAgeRange: [],
  overviewHeadcountByAgeRangeFilter: [],
  overviewHeadcountAgeRangeDataAll: [],
  // headcount by education
  overviewHeadcountByEducation: [],
  overviewHeadcountByEducationFilter: [],
  overviewHeadcountEducationDataAll: [],
  // headcount by contract type
  overviewHeadcountByContractType: [],
  overviewHeadcountByContractTypeFilter: [],
  overviewHeadcountContractTypeDataAll: [],
  // headcount by hire
  overviewHeadcountByHire: [],
  overviewHeadcountByHireFilter: [],
  overviewHeadcountHireDataAll: [],
  // headcount by hire demographic
  overviewHeadcountDemographic: [],
  overviewHeadcountDemographicFilter: [],
  overviewHeadcountDemographicDataAll: [],
  // average employee score by department
  summaryAverageScore: [],
  summaryAverageScoreFilter: [],
  summaryAverageScoreDataAll: [],
  // sick vocation leave
  summarySickVocationLeave: [],
  summarySickVocationLeaveFilter: [],
  summarySickVocationLeaveDataAll: [],
  // total salary
  summaryTotalSalary: [],
  summaryTotalSalaryFilter: [],
  summaryTotalSalaryDataAll: [],
  // training total cost
  trainingTotalCostOverview: [],
  trainingTotalCostOverviewFilter: [],
  trainingTotalCostOverviewDataAll: [],
  // training total cost by program
  trainingTotalCostByProgram: [],
  trainingTotalCostByProgramFilter: [],
  trainingTotalCostByProgramDataAll: [],
  // training type
  trainingType: [],
  trainingTypeFilter: [],
  trainingTypeDataAll: [],
  // training department
  trainingDepartment: [],
  trainingDepartmentFilter: [],
  trainingDepartmentDataAll: [],
  trainingCalTotal: [],
  getInitialData: async (turnLoading, offLoading) => {
    turnLoading && turnLoading();
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
      const res6 = await axios.get(
        `/api/charts/employees-overview/headcount-by-hire`
      );
      const res7 = await axios.get(
        `/api/charts/employees-overview/headcount-demographic`
      );
      const res8 = await axios.get(
        `/api/charts/employees-overview/average-employee-score-by-department`
      );
      const res9 = await axios.get(
        `/api/charts/employees-overview/sick-vocation-leave-by-year`
      );
      const res10 = await axios.get(
        `/api/charts/employees-overview/total-salary-expenses-by-department`
      );
      const res11 = await axios.get(
        `/api/charts/employees-overview/training-total-overview`
      );
      const res12 = await axios.get(
        `/api/charts/employees-overview/training-cost-by-program`
      );
      const res13 = await axios.get(
        `/api/charts/employees-overview/training-type`
      );
      const res14 = await axios.get(
        `/api/charts/employees-overview/training-cost-by-department`
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
        overviewHeadcountByHire: !isEmpty(res6.data) ? res6.data?.data : [],
        overviewHeadcountHireDataAll: !isEmpty(res6.data)
          ? res6.data?.dataAll
          : [],
        overviewHeadcountDemographic: !isEmpty(res7.data)
          ? res7.data?.data
          : [],
        overviewHeadcountDemographicDataAll: !isEmpty(res7.data)
          ? res7.data?.dataAll
          : [],
        summaryAverageScore: !isEmpty(res8.data) ? res8.data?.data : [],
        summaryAverageScoreDataAll: !isEmpty(res8.data)
          ? res8.data?.dataAll
          : [],
        summarySickVocationLeave: !isEmpty(res9.data) ? res9.data?.data : [],
        summarySickVocationLeaveDataAll: !isEmpty(res9.data)
          ? res9.data?.data
          : [],
        summaryTotalSalary: !isEmpty(res10.data) ? res10.data?.data : [],
        summaryTotalSalaryDataAll: !isEmpty(res10.data)
          ? res10.data?.dataAll
          : [],
        trainingTotalCostOverview: !isEmpty(res11.data) ? res11.data?.data : [],
        trainingTotalCostOverviewDataAll: !isEmpty(res11.data)
          ? res11.data?.dataAll
          : [],
        trainingTotalCostByProgram: !isEmpty(res12.data)
          ? res12.data?.data
          : [],
        trainingTotalCostByProgramDataAll: !isEmpty(res12.data)
          ? res12.data?.dataAll
          : [],
        trainingType: !isEmpty(res13.data) ? res13.data?.data : [],
        trainingTypeDataAll: !isEmpty(res13.data) ? res13.data?.dataAll : [],
        trainingDepartment: !isEmpty(res14.data) ? res14.data?.data : [],
        trainingDepartmentDataAll: !isEmpty(res14.data)
          ? res14.data?.dataAll
          : [],
      }));
      offLoading && offLoading()
    } catch (err) {
      offLoading && offLoading()
      console.log(err);
    }
  },
  filterDataByYear: (year?: string) => {
    set((state: StateContract) => {
      let value = 0;
      if (!isEmpty(year) && !isEmpty(state.trainingDepartment)) {
        const findItem = state.trainingDepartment.find(
          (item: TypeOVHeadCountByPosition) => item.YEAR === year
        );
        if (!isEmpty(findItem)) {
          findItem.DATA.forEach((it: { LABEL: string; DATA: number }) => {
            value += Number(it.DATA);
          });
        }
      }
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
        overviewHeadcountByHireFilter: !isEmpty(year)
          ? state.overviewHeadcountByHire.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.overviewHeadcountHireDataAll,
        overviewHeadcountDemographicFilter: !isEmpty(year)
          ? state.overviewHeadcountDemographic.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.overviewHeadcountDemographicDataAll,
        summaryAverageScoreFilter: !isEmpty(year)
          ? state.summaryAverageScore.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.summaryAverageScoreDataAll,
        summarySickVocationLeaveFilter: !isEmpty(year)
          ? state.summarySickVocationLeave.filter(
              (item: any) => item.YEAR === year
            )
          : state.summarySickVocationLeaveDataAll,
        summaryTotalSalaryFilter: !isEmpty(year)
          ? state.summaryTotalSalary.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.summaryTotalSalaryDataAll,
        trainingTotalCostOverviewFilter: !isEmpty(year)
          ? state.trainingTotalCostOverview.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.trainingTotalCostOverviewDataAll,
        trainingTotalCostByProgramFilter: !isEmpty(year)
          ? state.trainingTotalCostByProgram.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.trainingTotalCostByProgramDataAll,
        trainingTypeFilter: !isEmpty(year)
          ? state.trainingType.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.trainingTypeDataAll,
        trainingDepartmentFilter: !isEmpty(year)
          ? state.trainingDepartment.find(
              (item: TypeOVHeadCountByPosition) => item.YEAR === year
            )?.DATA ?? []
          : state.trainingDepartmentDataAll,
        trainingCalTotal: !isEmpty(year)
          ? [{ YEAR: year as string, DATA: value }]
          : state.trainingDepartment.map(
              (item: {
                YEAR: string;
                DATA: { LABEL: string; DATA: number }[];
              }) => {
                let value = 0;
                item.DATA.forEach(
                  (its: { LABEL: string; DATA: number }) =>
                    (value += Number(its.DATA))
                );
                return {
                  YEAR: item.YEAR,
                  DATA: value,
                };
              }
            ),
      };
    });
  },
}));

export default useChartData;

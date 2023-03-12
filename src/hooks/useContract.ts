import axios from "axios";
import { create } from "zustand";
import isEmpty from "lodash.isempty";

type TypeDetailHeadcount = {
  COLOR: string;
  DATA: number | string;
  LABEL: string;
};

type StateContract = {
  detailHeadcount: TypeDetailHeadcount[];
  contractTypeHeadcount: TypeDetailHeadcount[];
  genderTypeHeadcount: TypeDetailHeadcount[];
  ageRangeTypeHeadcount: TypeDetailHeadcount[];
  getInitialData: () => void;
};

const useContract = create<StateContract>((set) => ({
  detailHeadcount: [],
  contractTypeHeadcount: [],
  genderTypeHeadcount: [],
  ageRangeTypeHeadcount: [],
  getInitialData: async () => {
    try {
      const res = await axios.get(
        "/api/charts/contract-chart"
      );
      if (!isEmpty(res.data)) {
        set((state: StateContract) => ({
          ...state,
          detailHeadcount: !isEmpty(res.data[0]) ? res.data[0]?.DATA : [],
          contractTypeHeadcount: !isEmpty(res.data[1]) ? res.data[1]?.DATA : [],
          genderTypeHeadcount: !isEmpty(res.data[2]) ? res.data[2]?.DATA : [],
          ageRangeTypeHeadcount: !isEmpty(res.data[3]) ? res.data[3]?.DATA : [],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },
  //   turnOn: () => set((state: StateLoading) => ({ ...state, status: true })),
}));

export default useContract;

import { create } from "zustand";

type StateLoading = {
  status: boolean;
  ///
  turnOff: () => void;
  turnOn: () => void;
};

const useLoading = create<StateLoading>((set) => ({
  status: false,
  turnOff: () => set((state: StateLoading) => ({ ...state, status: false })),
  turnOn: () => set((state: StateLoading) => ({ ...state, status: true })),
}));

export default useLoading;
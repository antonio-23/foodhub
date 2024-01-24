import { create } from "zustand";
import {
  Gender,
  PhysicalActivity,
  RegisterState,
  WeightManagementGoal,
} from "./registerStore.types";

export const useRegisterStore = create<RegisterState>((set) => ({
  user: {
    name: "",
    email: "",
    password: "",
    weightManagementGoal: WeightManagementGoal.WEIGHT_MAINTENANCE,
    physicalActivity: PhysicalActivity.MEDIUM,
    gender: Gender.MALE,
    birthDate: "",
    height: 0,
    actualWeight: 0,
    weightGoal: 0,
  },
  setUserCredentials: (name, email, password) =>
    set((state) => ({
      user: {
        ...state.user,
        name,
        email,
        password,
      },
    })),
  setUserWeightManagementGoal: (weightManagementGoal) =>
    set((state) => ({
      user: {
        ...state.user,
        weightManagementGoal,
      },
    })),
  setPhysicalActivity: (physicalActivity) =>
    set((state) => ({
      user: {
        ...state.user,
        physicalActivity,
      },
    })),
  setUserParameters: (gender, birthDate, height, actualWeight, weightGoal) =>
    set((state) => ({
      user: {
        ...state.user,
        gender,
        birthDate,
        height,
        actualWeight,
        weightGoal,
      },
    })),
}));

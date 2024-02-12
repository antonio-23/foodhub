export enum WeightManagementGoal {
  WEIGHT_LOSS = "WEIGHT_LOSS",
  WEIGHT_GAIN = "WEIGHT_GAIN",
  WEIGHT_MAINTENANCE = "WEIGHT_MAINTENANCE",
}

export enum PhysicalActivity {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface RegisterState {
  user: {
    name: string;
    email: string;
    password: string;
    weightManagementGoal: WeightManagementGoal;
    physicalActivity: PhysicalActivity;
    gender: Gender;
    birthDate: string;
    height: number;
    actualWeight: number;
    weightGoal: number;
    macros: {};
  };
  setUserCredentials: (name: string, email: string, password: string) => void;
  setUserWeightManagementGoal: (
    weightManagementGoal: WeightManagementGoal,
    macros: {},
  ) => void;
  setPhysicalActivity: (physicalActivity: PhysicalActivity) => void;
  setUserParameters: (
    gender: Gender,
    birthDate: string,
    height: number,
    actualWeight: number,
    weightGoal: number,
  ) => void;
}

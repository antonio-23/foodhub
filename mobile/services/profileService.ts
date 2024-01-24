export interface EditProfileFormData {
  userIdFromDb: string;
  updatedAt: Date;
  avatar: string;
  name: string;
  birthDate: string;
  password: string;
  passwordConfirm: string;
}

export interface EditMeasurementsFormData {
  height: number;
  actualWeight: number;
  weightGoal: number;
  physicalActivity: string;
}

export interface EditMacrosFormData {
  kcal: number;
  protein: number;
  fat: number;
  carb: number;
}

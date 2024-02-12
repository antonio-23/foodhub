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
  id: string;
  height: number;
  actualWeight: number;
  weightGoal: number;
  physicalActivity: string;
}

export interface EditMacrosFormData {
  id?: string;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

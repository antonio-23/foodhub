export interface User {
  email: string;
  password: string;
}

export interface UserUpdateForm {
  name?: string;
  email?: string;
  password?: string;
}

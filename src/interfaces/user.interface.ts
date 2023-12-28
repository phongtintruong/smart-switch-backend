export interface User {
  _id: string;
  username: string;
  password: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  repeat_password: string;
}

export interface FormError {
  field: string;
  error_message: string;
}

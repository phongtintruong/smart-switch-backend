export interface SwitchUser {
  user_id: string;
  switch: string;
  name?: string;
}

export interface CreateUserDto {
  switch: string;
}

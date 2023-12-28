export interface SwitchUser {
  user_id: string;
  switch_id: string;
  name?: string;
}

export interface CreateUserDto {
  switch_id: string;
}

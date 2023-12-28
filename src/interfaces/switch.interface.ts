export interface Switch {
  id: string;
  topic?: string;
}

export interface CreateSwitchDto {
  id: string;
  private_key: string;
}

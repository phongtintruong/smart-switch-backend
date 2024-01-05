import { SWITCH_STATUS } from './constants';

export interface Switch {
  id: string;
  topic?: string;
  status?: SWITCH_STATUS;
}

export interface CreateSwitchDto {
  id: string;
  private_key: string;
}

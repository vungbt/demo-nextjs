import { EConfigType } from './configs';

export type RoomItem = {
  id: number;
  name: string;
  created_at: Date | string | number;
  config_id: number;
  config?: {
    type: EConfigType;
  };
};

export type RoomBody = {
  name: string;
  config_id: number;
};

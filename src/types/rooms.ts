import { EConfigType } from './configs';
import { UserItem } from './users';

export type RoomItem = {
  id: number;
  name: string;
  created_at: Date | string | number;
  config_id: number;
  config?: {
    type: EConfigType;
  };
  users: UserItem[];
};

export type RoomBody = {
  name: string;
  config_id: number;
};

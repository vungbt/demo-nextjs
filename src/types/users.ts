export type UserItem = {
  id: number;
  name: string;
  phone: string;
  address: string;
  cccd: string;
  room_id: number;
  created_at: Date | string | number;
  room?: {
    name?: string;
  };
};

export type UserBody = {
  name: string;
  phone: string;
  address: string;
  cccd: string;
  room_id: number;
};

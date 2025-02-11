export type ConfigItem = {
  id: number;
  created_at: Date | string | number;
  room_fee: number;
  water_fee: number;
  electric_fee: number;
  common_service_fee: number;
  internet_fee: number;
  type: EConfigType;
  is_special_room: boolean;
};

export enum EConfigType {
  Deluxe = 'deluxe',
  Luxury = 'luxury',
  Premium = 'premium'
}

export type ConfigBody = {
  room_fee: number;
  water_fee: number;
  electric_fee: number;
  common_service_fee: number;
  internet_fee: number;
  type: EConfigType;
  is_special_room?: boolean;
};

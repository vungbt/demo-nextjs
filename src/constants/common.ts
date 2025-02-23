import { SelectOptionItem } from '@/libraries/common';
import { EConfigType } from '@/types/configs';

export const RouterPaths = {
  Home: '/',
  Configs: '/configs',
  Users: '/users',
  Manager: '/manager',
  Rooms: '/rooms'
};

export const ConfigTypeLabels = {
  [EConfigType.Deluxe]: 'Deluxe',
  [EConfigType.Luxury]: 'Luxury',
  [EConfigType.Premium]: 'Premium'
};

export const ConfigTypeOptions: SelectOptionItem[] = [
  {
    label: ConfigTypeLabels[EConfigType.Deluxe],
    value: EConfigType.Deluxe
  },
  {
    label: ConfigTypeLabels[EConfigType.Luxury],
    value: EConfigType.Luxury
  },
  {
    label: ConfigTypeLabels[EConfigType.Premium],
    value: EConfigType.Premium
  }
];

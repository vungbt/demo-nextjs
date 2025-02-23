import { SelectOptionItem } from '@/libraries/common';
import { EConfigType } from '@/types/configs';

export const RouterPaths = {
  Home: '/',
  Configs: '/configs',
  Users: '/users',
  Manager: '/manager'
};

export const ConfigTypeOptions: SelectOptionItem[] = [
  {
    label: 'Deluxe',
    value: EConfigType.Deluxe
  },
  {
    label: 'Luxury',
    value: EConfigType.Luxury
  },
  {
    label: 'Premium',
    value: EConfigType.Premium
  }
];

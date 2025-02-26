import { SelectOptionItem } from '@/libraries/common';
import { RoomItem } from './rooms';

export type MonthItem = {
  id: number;
  old_electric_number: number;
  new_electric_number: number;
  new_water_number: number;
  old_water_number: number;
  month: EMonth;
  room: RoomItem;
  created_at: string;
};

export type MonthBody = {
  old_electric_number: number;
  new_electric_number: number;
  new_water_number: number;
  old_water_number: number;
  month: EMonth;
};

export enum EMonth {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12
}

export const MonthLabels = {
  [EMonth.January]: 'January',
  [EMonth.February]: 'February',
  [EMonth.March]: 'March',
  [EMonth.April]: 'April',
  [EMonth.May]: 'May',
  [EMonth.June]: 'June',
  [EMonth.July]: 'July',
  [EMonth.August]: 'August',
  [EMonth.September]: 'September',
  [EMonth.October]: 'October',
  [EMonth.November]: 'November',
  [EMonth.December]: 'December'
};

export const MonthOptions: SelectOptionItem[] = [
  {
    label: MonthLabels[EMonth.January],
    value: EMonth.January
  },
  {
    label: MonthLabels[EMonth.February],
    value: EMonth.February
  },
  {
    label: MonthLabels[EMonth.March],
    value: EMonth.March
  },
  {
    label: MonthLabels[EMonth.April],
    value: EMonth.April
  },
  {
    label: MonthLabels[EMonth.May],
    value: EMonth.May
  },
  {
    label: MonthLabels[EMonth.June],
    value: EMonth.June
  },
  {
    label: MonthLabels[EMonth.July],
    value: EMonth.July
  },
  {
    label: MonthLabels[EMonth.August],
    value: EMonth.August
  },
  {
    label: MonthLabels[EMonth.September],
    value: EMonth.September
  },
  {
    label: MonthLabels[EMonth.October],
    value: EMonth.October
  },
  {
    label: MonthLabels[EMonth.November],
    value: EMonth.November
  },
  {
    label: MonthLabels[EMonth.December],
    value: EMonth.December
  }
];

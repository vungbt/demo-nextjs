import { EMonth } from './months';

export enum ESlugAction {
  Add = 'add'
}

export type PaginationParams = {
  page: number;
  limit: number;
  month?: EMonth;
};

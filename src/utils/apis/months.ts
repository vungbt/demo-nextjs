import { EMonth, MonthBody, MonthItem } from '@/types';
import { supabase } from '../supabase';
import { getPagination } from '../helpers/common';
import { PaginationParams } from '@/types';

const TableName = {
  Months: 'months'
};

const commonQuery =
  '*, room:room_id(id, name, config:config_id (id, room_fee, water_fee, electric_fee, common_service_fee, internet_fee, type, is_special_room), users(id))';
export const apiGetMonths = async ({ page, limit, month }: PaginationParams) => {
  const pagination = await getPagination({ page, limit });
  const res = await supabase
    .from(TableName.Months)
    .select(commonQuery)
    .range(pagination.start, pagination.end)
    .order('month', { ascending: false })
    .order('room(name)', { ascending: true })
    .eq('month', month || EMonth.January);
  const modifyRes: MonthItem[] = res.data ?? [];
  if (res.status === 200) return { data: modifyRes };
  return { data: [] };
};

export const apiCreateMonth = async (body: MonthBody) => {
  const res = await supabase
    .from(TableName.Months)
    .insert([
      {
        ...body
      }
    ])
    .select('*');
  let data: MonthItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: MonthItem[] = (res.data ?? []).map(
      (item: MonthItem) =>
        ({
          old_electric_number: item.old_electric_number,
          new_electric_number: item.new_electric_number,
          new_water_number: item.new_water_number,
          old_water_number: item.old_water_number,
          month: item.month
        }) as MonthItem
    );
    data = modifyRes[0];
  }
  return data;
};

export const apiUpdateMonth = async (id: number | string, body: MonthBody) => {
  if (!id) return;
  const res = await supabase
    .from(TableName.Months)
    .update({
      ...body
    })
    .eq('id', id)
    .select('*');
  let data: MonthItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: MonthItem[] = (res.data ?? []).map(
      (item: MonthItem) =>
        ({
          old_electric_number: item.old_electric_number,
          new_electric_number: item.new_electric_number,
          new_water_number: item.new_water_number,
          old_water_number: item.old_water_number,
          month: item.month
        }) as MonthItem
    );
    data = modifyRes[0];
  }
  return data;
};

export const apiDeleteMonth = async (id: number) => {
  const res = await supabase.from(TableName.Months).delete().eq('id', id);
  if (res.status === 204 || res.status === 200) return true;
  return false;
};

export const apiGetMonth = async (id: number | string) => {
  const res = await supabase.from(TableName.Months).select(commonQuery).eq('id', id);
  let data: MonthItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: MonthItem[] = (res.data ?? []).map(
      (item: MonthItem) =>
        ({
          old_electric_number: item.old_electric_number,
          new_electric_number: item.new_electric_number,
          new_water_number: item.new_water_number,
          old_water_number: item.old_water_number,
          month: item.month
        }) as MonthItem
    );
    data = modifyRes[0];
  }
  return data;
};

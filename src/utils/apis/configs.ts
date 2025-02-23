import { ConfigBody, ConfigItem } from '@/types/configs';
import { supabase } from '../supabase';
import { getPagination } from '../helpers/common';
import { PaginationParams } from '@/types';

const TableName = {
  Configs: 'configs'
};
export const apiGetConfigs = async ({ page, limit }: PaginationParams) => {
  const pagination = await getPagination({ page, limit });
  const res = await supabase
    .from(TableName.Configs)
    .select('*')
    .range(pagination.start, pagination.end)
    .order('room_fee', { ascending: true });
  const modifyRes: ConfigItem[] = res.data ?? [];
  if (res.status === 200) return { data: modifyRes };
  return { data: [] };
};

export const apiCreateConfig = async (body: ConfigBody) => {
  const res = await supabase
    .from(TableName.Configs)
    .insert([
      {
        ...body
      }
    ])
    .select('*');
  let data: ConfigItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: ConfigItem[] = (res.data ?? []).map(
      (item: ConfigItem) =>
        ({
          room_fee: item.room_fee,
          water_fee: item.water_fee,
          electric_fee: item.electric_fee,
          common_service_fee: item.common_service_fee,
          internet_fee: item.internet_fee,
          type: item.type,
          is_special_room: item.is_special_room
        }) as ConfigItem
    );
    data = modifyRes[0];
  }
  return data;
};

export const apiUpdateConfig = async (id: number | string, body: ConfigBody) => {
  if (!id) return;
  const res = await supabase
    .from(TableName.Configs)
    .update({
      ...body
    })
    .eq('id', id)
    .select('*');
  let data: ConfigItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: ConfigItem[] = (res.data ?? []).map(
      (item: ConfigItem) =>
        ({
          id: item.id,
          room_fee: item.room_fee,
          water_fee: item.water_fee,
          electric_fee: item.electric_fee,
          common_service_fee: item.common_service_fee,
          internet_fee: item.internet_fee,
          type: item.type,
          is_special_room: item.is_special_room
        }) as ConfigItem
    );
    data = modifyRes[0];
  }
  return data;
};

export const apiDeleteConfig = async (id: number) => {
  const res = await supabase.from('configs').delete().eq('id', id);
  if (res.status === 204 || res.status === 200) return true;
  return false;
};

export const apiGetConfig = async (id: number | string) => {
  const res = await supabase.from(TableName.Configs).select('*').eq('id', id);
  let data: ConfigItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: ConfigItem[] = (res.data ?? []).map(
      (item: ConfigItem) =>
        ({
          id: item.id,
          room_fee: item.room_fee,
          water_fee: item.water_fee,
          electric_fee: item.electric_fee,
          common_service_fee: item.common_service_fee,
          internet_fee: item.internet_fee,
          type: item.type,
          is_special_room: item.is_special_room
        }) as ConfigItem
    );
    data = modifyRes[0];
  }
  return data;
};

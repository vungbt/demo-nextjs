import { RoomBody, RoomItem } from '@/types';
import { supabase } from '../supabase';
import { getPagination } from '../helpers/common';
import { PaginationParams } from '@/types';

const TableName = {
  Rooms: 'rooms'
};
const commonQuery =
  '*, config:config_id (id, room_fee, water_fee, electric_fee, common_service_fee, internet_fee, type, is_special_room), users(id)';
export const apiGetRooms = async ({ page, limit }: PaginationParams) => {
  const pagination = await getPagination({ page, limit });
  const res = await supabase
    .from(TableName.Rooms)
    .select(commonQuery)
    .range(pagination.start, pagination.end)
    .order('name', { ascending: true });
  const modifyRes: RoomItem[] = res.data ?? [];
  if (res.status === 200) return { data: modifyRes };
  return { data: [] };
};

export const apiCreateRoom = async (body: RoomBody) => {
  const res = await supabase
    .from(TableName.Rooms)
    .insert([
      {
        ...body
      }
    ])
    .select('*');
  let data: RoomItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: RoomItem[] = (res.data ?? []).map(
      (item: RoomItem) =>
        ({
          name: item.name,
          config_id: item.config_id
        }) as RoomItem
    );
    data = modifyRes[0];
  }
  return data;
};

export const apiUpdateRoom = async (id: number | string, body: RoomBody) => {
  if (!id) return;
  const res = await supabase
    .from(TableName.Rooms)
    .update({
      ...body
    })
    .eq('id', id)
    .select('*');
  let data: RoomItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: RoomItem[] = (res.data ?? []).map(
      (item: RoomItem) =>
        ({
          name: item.name,
          config_id: item.config_id
        }) as RoomItem
    );
    data = modifyRes[0];
  }
  return data;
};

export const apiDeleteRoom = async (id: number) => {
  const res = await supabase.from('rooms').delete().eq('id', id);
  if (res.status === 204 || res.status === 200) return true;
  return false;
};

export const apiGetRoom = async (id: number | string) => {
  const res = await supabase.from(TableName.Rooms).select(commonQuery).eq('id', id);
  let data: RoomItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: RoomItem[] = (res.data ?? []).map(
      (item: RoomItem) =>
        ({
          name: item.name,
          config_id: item.config_id
        }) as RoomItem
    );
    data = modifyRes[0];
  }
  return data;
};

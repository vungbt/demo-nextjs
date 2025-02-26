import { UserBody, UserItem } from '@/types';
import { supabase } from '../supabase';
import { getPagination } from '../helpers/common';
import { PaginationParams } from '@/types';

const TableName = {
  Users: 'users'
};
const commonQuery = '*, room:room_id (id, name)';
export const apiGetUsers = async ({ page, limit }: PaginationParams) => {
  const pagination = await getPagination({ page, limit });
  const res = await supabase
    .from(TableName.Users)
    .select(commonQuery)
    .range(pagination.start, pagination.end)
    .order('room(name)', { ascending: true });
  const modifyRes: UserItem[] = res.data ?? [];
  if (res.status === 200) return { data: modifyRes };
  return { data: [] };
};

export const apiCreateUser = async (body: UserBody) => {
  const res = await supabase
    .from(TableName.Users)
    .insert([
      {
        ...body
      }
    ])
    .select('*');
  let data: UserItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: UserItem[] = (res.data ?? []).map(
      (item: UserItem) =>
        ({
          name: item.name,
          phone: item.phone,
          address: item.address,
          cccd: item.cccd,
          room_id: item.room_id
        }) as UserItem
    );
    data = modifyRes[0];
  }
  return data;
};

export const apiUpdateUser = async (id: number | string, body: UserBody) => {
  if (!id) return;
  const res = await supabase
    .from(TableName.Users)
    .update({
      ...body
    })
    .eq('id', id)
    .select('*');
  let data: UserItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: UserItem[] = (res.data ?? []).map(
      (item: UserItem) =>
        ({
          name: item.name,
          phone: item.phone,
          address: item.address,
          cccd: item.cccd,
          room_id: item.room_id
        }) as UserItem
    );
    data = modifyRes[0];
  }
  return data;
};

export const apiDeleteUser = async (id: number) => {
  const res = await supabase.from('users').delete().eq('id', id);
  if (res.status === 204 || res.status === 200) return true;
  return false;
};

export const apiGetUser = async (id: number | string) => {
  const res = await supabase.from(TableName.Users).select(commonQuery).eq('id', id);
  let data: UserItem | null = null;
  if (res.error === null && res.data.length > 0) {
    const modifyRes: UserItem[] = (res.data ?? []).map(
      (item: UserItem) =>
        ({
          name: item.name,
          phone: item.phone,
          address: item.address,
          cccd: item.cccd,
          room_id: item.room_id
        }) as UserItem
    );
    data = modifyRes[0];
  }
  return data;
};

'use client';
import { RouterPaths } from '@/constants/common';
import { PaginationParams } from '@/types';
import { UserItem } from '@/types';
import { apiDeleteUser, apiGetUsers } from '@/utils/apis';
import { toastError, toastSuccess } from '@/utils/helpers/toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type UserListUtilsResult = {
  loading: boolean;
  data: UserItem[];
  itemNeedDelete: UserItem | null;
  onEdit: (item: UserItem) => void;
  onDelete: (item: UserItem) => void;
  setItemNeedDelete: (item: UserItem | null) => void;
  onConfirmDelete: () => void;
};
export default function UserListUtils(): UserListUtilsResult {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserItem[]>([]);

  const [itemNeedDelete, setItemNeedDelete] = useState<UserItem | null>(null);
  const [pagination, setPagination] = useState<PaginationParams>({ page: 1, limit: 10 });

  useEffect(() => {
    fetchingData(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const fetchingData = async (params: PaginationParams) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetUsers(params);
      setData(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const onEdit = (item: UserItem) => {
    if (!item || !item.id) return toastError('User record not found.');
    router.push(`${RouterPaths.Users}/${item.id}`);
  };
  const onDelete = (item: UserItem) => setItemNeedDelete(item);

  const onConfirmDelete = async () => {
    if (!itemNeedDelete || !itemNeedDelete.id) return toastError('User record not found.');
    const res = await apiDeleteUser(itemNeedDelete.id);
    if (!res) return toastError('Deleted user failed.');
    setPagination({ ...pagination, page: 1 });
    toastSuccess('Delete user successfully.');
    setItemNeedDelete(null);
  };

  return {
    data,
    loading,
    itemNeedDelete,
    onEdit,
    onDelete,
    setItemNeedDelete,
    onConfirmDelete
  };
}

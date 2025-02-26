'use client';
import { RouterPaths } from '@/constants/common';
import { PaginationParams, MonthItem } from '@/types';
import { apiDeleteMonth, apiGetMonths } from '@/utils/apis';
import { toastError, toastSuccess } from '@/utils/helpers/toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type MonthListUtilsResult = {
  loading: boolean;
  data: MonthItem[];
  itemNeedDelete: MonthItem | null;
  onEdit: (item: MonthItem) => void;
  onDelete: (item: MonthItem) => void;
  setItemNeedDelete: (item: MonthItem | null) => void;
  onConfirmDelete: () => void;
};
export default function MonthListUtils(): MonthListUtilsResult {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<MonthItem[]>([]);

  const [itemNeedDelete, setItemNeedDelete] = useState<MonthItem | null>(null);
  const [pagination, setPagination] = useState<PaginationParams>({ page: 1, limit: 10 });

  useEffect(() => {
    fetchingData(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const fetchingData = async (params: PaginationParams) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetMonths(params);
      setData(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const onEdit = (item: MonthItem) => {
    if (!item || !item.id) return toastError('Month record not found.');
    router.push(`${RouterPaths.Manager}/${item.id}`);
  };
  const onDelete = (item: MonthItem) => setItemNeedDelete(item);

  const onConfirmDelete = async () => {
    if (!itemNeedDelete || !itemNeedDelete.id) return toastError('Month record not found.');
    const res = await apiDeleteMonth(itemNeedDelete.id);
    if (!res) return toastError('Deleted month failed.');
    setPagination({ ...pagination, page: 1 });
    toastSuccess('Delete month successfully.');
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

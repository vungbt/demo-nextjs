'use client';
import { RouterPaths } from '@/constants/common';
import { PaginationParams } from '@/types';
import { ConfigItem } from '@/types/configs';
import { apiDeleteConfig, apiGetConfigs } from '@/utils/apis/configs';
import { toastError, toastSuccess } from '@/utils/helpers/toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ConfigListUtilsResult = {
  loading: boolean;
  data: ConfigItem[];
  itemNeedDelete: ConfigItem | null;
  onEdit: (item: ConfigItem) => void;
  onDelete: (item: ConfigItem) => void;
  setItemNeedDelete: (item: ConfigItem | null) => void;
  onConfirmDelete: () => void;
};
export default function ConfigListUtils(): ConfigListUtilsResult {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ConfigItem[]>([]);

  const [itemNeedDelete, setItemNeedDelete] = useState<ConfigItem | null>(null);
  const [pagination, setPagination] = useState<PaginationParams>({ page: 1, limit: 10 });

  useEffect(() => {
    fetchingData(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const fetchingData = async (params: PaginationParams) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetConfigs(params);
      setData(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const onEdit = (item: ConfigItem) => {
    if (!item || !item.id) return toastError('Config record not found.');
    router.push(`${RouterPaths.Configs}/${item.id}`);
  };
  const onDelete = (item: ConfigItem) => setItemNeedDelete(item);

  const onConfirmDelete = async () => {
    if (!itemNeedDelete || !itemNeedDelete.id) return toastError('Config record not found.');
    const res = await apiDeleteConfig(itemNeedDelete.id);
    if (!res) return toastError('Deleted config failed.');
    setPagination({ ...pagination, page: 1 });
    toastSuccess('Delete config successfully.');
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

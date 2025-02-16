'use client';
import { RouterPaths } from '@/constants/common';
import { ConfigItem } from '@/types/configs';
import { apiGetConfigs } from '@/utils/apis/configs';
import { toastError } from '@/utils/helpers/toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ConfigListUtilsResult = {
  loading: boolean;
  data: ConfigItem[];
  itemNeedDelete: ConfigItem | null
  onEdit: (item: ConfigItem) => void;
  onDelete: (item: ConfigItem) => void;
  setItemNeedDelete: (item: ConfigItem | null) => void
  onConfirmDelete: () => void
};
export default function ConfigListUtils(): ConfigListUtilsResult {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ConfigItem[]>([]);

  const [itemNeedDelete, setItemNeedDelete] = useState<ConfigItem | null>(null);

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetConfigs();
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

  const onConfirmDelete = () => {
    if (!itemNeedDelete || !itemNeedDelete.id) return toastError('Config record not found.');
  }

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

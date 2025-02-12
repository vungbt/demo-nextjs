'use client';
import { ConfigItem } from '@/types/configs';
import { apiGetConfigs } from '@/utils/apis/configs';
import { useEffect, useState } from 'react';

type ConfigListUtilsResult = {
  loading: boolean;
  data: ConfigItem[];
  onEdit: (item: ConfigItem) => void;
  onDelete: (item: ConfigItem) => void;
};
export default function ConfigListUtils(): ConfigListUtilsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ConfigItem[]>([]);

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

  const onEdit = (item: ConfigItem) => console.log('view===>', item);
  const onDelete = (item: ConfigItem) => console.log('view===>', item);

  return {
    data,
    loading,
    onEdit,
    onDelete
  };
}

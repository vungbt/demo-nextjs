'use client';
import { ConfigItem } from '@/types/configs';
import { apiGetConfigs } from '@/utils/apis/configs';
import { useEffect, useState } from 'react';

type ConfigListUtilsUtils = {
  loading: boolean;
  data: ConfigItem[];
};
export default function ConfigListUtils(): ConfigListUtilsUtils {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ConfigItem[]>([]);

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      setLoading(true);
      if (loading) return;
      const res = await apiGetConfigs();
      setData(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return {
    data,
    loading
  };
}

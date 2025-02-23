import { ConfigTypeLabels } from '@/constants/common';
import { SelectOptionItem } from '@/libraries/common';
import { ConfigItem, PaginationParams } from '@/types';
import { apiGetConfigs } from '@/utils/apis';
import { useEffect, useMemo, useState } from 'react';

const useConfigs = () => {
  const [pagination, setPagination] = useState<PaginationParams>({ page: 1, limit: 10 });
  const [loading, setLoading] = useState<boolean>(false);
  const [configs, setConfigs] = useState<ConfigItem[]>([]);

  useEffect(() => {
    fetchingConfigs(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const configOptions: SelectOptionItem[] = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      configs.map((item) => ({
        value: item.id as any,
        label: `${ConfigTypeLabels[item.type]}-${item.room_fee}`
      })),
    [configs]
  );

  const fetchingConfigs = async (pagination: PaginationParams) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetConfigs(pagination);
      setConfigs(res?.data || []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return {
    configs,
    loading,
    configOptions,
    pagination,
    setPagination
  };
};

export default useConfigs;

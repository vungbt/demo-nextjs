import { SelectOptionItem } from '@/libraries/common';
import { PaginationParams, RoomItem } from '@/types';
import { apiGetRooms } from '@/utils/apis';
import { useEffect, useMemo, useState } from 'react';

const useRooms = () => {
  const [pagination, setPagination] = useState<PaginationParams>({ page: 1, limit: 10 });
  const [loading, setLoading] = useState<boolean>(false);
  const [rooms, setRooms] = useState<RoomItem[]>([]);

  useEffect(() => {
    fetchingRooms(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const roomOptions: SelectOptionItem[] = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => rooms.map((item) => ({ value: item.id as any, label: item.name })),
    [rooms]
  );

  const fetchingRooms = async (pagination: PaginationParams) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetRooms(pagination);
      setRooms(res?.data || []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return {
    rooms,
    loading,
    roomOptions,
    pagination,
    setPagination
  };
};

export default useRooms;

'use client';
import { RouterPaths } from '@/constants/common';
import { PaginationParams, RoomItem } from '@/types';
import { apiDeleteRoom, apiGetRooms } from '@/utils/apis';
import { toastError, toastSuccess } from '@/utils/helpers/toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type RoomListUtilsResult = {
  loading: boolean;
  data: RoomItem[];
  itemNeedDelete: RoomItem | null;
  onEdit: (item: RoomItem) => void;
  onDelete: (item: RoomItem) => void;
  setItemNeedDelete: (item: RoomItem | null) => void;
  onConfirmDelete: () => void;
};
export default function RoomListUtils(): RoomListUtilsResult {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RoomItem[]>([]);

  const [itemNeedDelete, setItemNeedDelete] = useState<RoomItem | null>(null);
  const [pagination, setPagination] = useState<PaginationParams>({ page: 1, limit: 10 });

  useEffect(() => {
    fetchingData(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const fetchingData = async (params: PaginationParams) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetRooms(params);
      setData(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const onEdit = (item: RoomItem) => {
    if (!item || !item.id) return toastError('Room record not found.');
    router.push(`${RouterPaths.Rooms}/${item.id}`);
  };
  const onDelete = (item: RoomItem) => setItemNeedDelete(item);

  const onConfirmDelete = async () => {
    if (!itemNeedDelete || !itemNeedDelete.id) return toastError('Room record not found.');
    const res = await apiDeleteRoom(itemNeedDelete.id);
    if (!res) return toastError('Deleted room failed.');
    setPagination({ ...pagination, page: 1 });
    toastSuccess('Delete room successfully.');
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

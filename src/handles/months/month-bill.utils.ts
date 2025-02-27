import { SelectOptionItem } from '@/libraries/common';
import { MonthItem, PaginationParams, RoomItem, UserItem } from '@/types';
import { apiGetMonthByRoom, apiGetRooms } from '@/utils/apis';
import { formatPrice } from '@/utils/helpers/formatter';
import { useEffect, useState } from 'react';

type MonthBillUtilsResult = {
  monthBill: MonthItem | null;
  loadingDetail: boolean;
  tableData: any[];
  members: UserItem[];
  roomOptions: SelectOptionItem[];
  roomId?: number;
  monthId: number;
  onChangeRoom: (id: number) => void;
  onChangeMonth: (id: number) => void;
};

export default function MonthBillUtils(): MonthBillUtilsResult {
  // detail
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [monthBill, setMonthBill] = useState<MonthItem | null>(null);
  const date = new Date();
  const previousMonth = date.getMonth() || 12;
  const currentMonth = previousMonth + 1;
  const [monthId, setMonthId] = useState(currentMonth);

  // rooms
  const [loadingRoom, setLoadingRoom] = useState<boolean>(false);
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [paginationRoom] = useState<PaginationParams>({ page: 1, limit: 10 });
  const roomOptions: SelectOptionItem[] = rooms.map((item) => ({
    label: `Phòng ${item.name}`,
    value: item.id
  }));
  const [roomId, setRoomId] = useState<number>();

  useEffect(() => {
    if (monthId) {
      fetchingDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthId, roomId]);

  const fetchingDetail = async () => {
    try {
      if (!monthId || loadingDetail || !roomId || roomId <= 0) return;
      setLoadingDetail(true);
      const res = await apiGetMonthByRoom(roomId, monthId);
      setMonthBill(res);
      setLoadingDetail(false);
    } catch {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    fetchingRoom(paginationRoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationRoom]);

  // fetching room
  const fetchingRoom = async (params: PaginationParams) => {
    try {
      if (loadingRoom) return;
      setLoadingRoom(true);
      const res = await apiGetRooms(params);
      setRooms(res.data);
      setLoadingRoom(false);
    } catch {
      setLoadingRoom(false);
    }
  };

  const calculateElectricPrice = (
    oldNumber: number = 0,
    newNumber: number = 0,
    fee: number = 0
  ) => {
    const currentNumber = newNumber - oldNumber;
    const totalPrice = currentNumber * fee;
    return {
      label: `( ${newNumber} - ${oldNumber} ) = ${currentNumber}số x ${formatPrice(fee)}/số`,
      value: formatPrice(totalPrice),
      totalPrice
    };
  };

  const calculateWaterPrice = (oldNumber: number = 0, newNumber: number = 0, fee: number = 0) => {
    const currentNumber = newNumber - oldNumber;
    const totalPrice = currentNumber * fee;
    return {
      label: `( ${newNumber} - ${oldNumber} ) = ${currentNumber}m3 x ${formatPrice(fee)}/m3`,
      value: formatPrice(totalPrice),
      totalPrice
    };
  };

  const calculateCommonServicePrice = (member: UserItem[] = [], fee: number = 0) => {
    const totalMember = member.length;
    const totalPrice = totalMember * fee;
    return {
      label: `${fee} x ${totalMember} ( số người / phòng ) = ${totalPrice}`,
      value: formatPrice(totalPrice),
      totalPrice
    };
  };

  const calculateTotalPrice = (item: MonthItem | null) => {
    const electric = calculateElectricPrice(
      item?.old_electric_number,
      item?.new_electric_number,
      item?.room?.config?.electric_fee
    ).totalPrice;
    const water = calculateWaterPrice(
      item?.old_water_number,
      item?.new_water_number,
      item?.room?.config?.water_fee
    ).totalPrice;
    const internet = item?.room.config?.internet_fee || 0;
    const room = item?.room.config?.room_fee || 0;
    const common = calculateCommonServicePrice(
      item?.room?.users as UserItem[],
      item?.room?.config?.common_service_fee
    ).totalPrice;

    const total = electric + water + internet + room + common;
    return {
      total: total,
      label: formatPrice(total)
    };
  };

  const tableData = [
    {
      id: 1,
      label: 'Phòng',
      detail: `P${monthBill?.room?.name || ''}`,
      price: formatPrice(monthBill?.room?.config?.room_fee || 0)
    },
    {
      id: 2,
      label: 'Điện',
      detail: calculateElectricPrice(
        monthBill?.old_electric_number,
        monthBill?.new_electric_number,
        monthBill?.room?.config?.electric_fee
      ).label,
      price: calculateElectricPrice(
        monthBill?.old_electric_number,
        monthBill?.new_electric_number,
        monthBill?.room?.config?.electric_fee
      ).value
    },
    {
      id: 3,
      label: 'Nước',
      detail: calculateWaterPrice(
        monthBill?.old_water_number,
        monthBill?.new_water_number,
        monthBill?.room?.config?.water_fee
      ).label,
      price: calculateWaterPrice(
        monthBill?.old_water_number,
        monthBill?.new_water_number,
        monthBill?.room?.config?.water_fee
      ).value
    },
    {
      id: 4,
      label: 'Internet',
      detail: formatPrice(monthBill?.room?.config?.internet_fee || 0),
      price: formatPrice(monthBill?.room?.config?.internet_fee || 0)
    },
    {
      id: 5,
      label: 'Dịch vụ chung',
      detail: calculateCommonServicePrice(
        monthBill?.room?.users as UserItem[],
        monthBill?.room?.config?.common_service_fee
      ).label,
      price: calculateCommonServicePrice(
        monthBill?.room?.users as UserItem[],
        monthBill?.room?.config?.common_service_fee
      ).value
    },
    {
      id: '',
      label: '',
      detail: `Cộng:`,
      price: calculateTotalPrice(monthBill).label
    }
  ];

  return {
    monthBill,
    loadingDetail,
    tableData,
    roomId,
    monthId,
    roomOptions,
    onChangeRoom: setRoomId,
    onChangeMonth: setMonthId,
    members: monthBill?.room?.users || []
  };
}

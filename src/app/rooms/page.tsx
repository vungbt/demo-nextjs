'use client';
import { RouterPaths } from '@/constants/common';
import RoomListUtils from '@/handles/rooms/room-list.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Table } from '@/libraries/common';
import { RoomItem } from '@/types';
import { RoomModal } from '@/views/room/room-modal';
import { RoomColumn } from '@/views/room/room.column';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function RoomsPage() {
  const { data, loading, itemNeedDelete, onEdit, onDelete, setItemNeedDelete, onConfirmDelete } =
    RoomListUtils();
  const { actions } = useTopBar();
  const router = useRouter();

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Rooms',
      actions: [
        <Button
          key="add"
          text="Add room"
          size="sm"
          variant="neutral"
          onClick={() => router.push(`${RouterPaths.Rooms}/add`)}
        />
      ]
    });
  }, []);

  return (
    <div>
      <Table<RoomItem>
        columns={RoomColumn({
          onDelete,
          onEdit
        })}
        data={data}
        loading={loading}
        customClass={{ wrap: 'h-full', table: 'table-pin-cols' }}
      />
      <RoomModal
        isOpen={!!itemNeedDelete}
        onClose={() => setItemNeedDelete(null)}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}

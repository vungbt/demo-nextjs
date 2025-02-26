'use client';
import { RouterPaths } from '@/constants/common';
import MonthListUtils from '@/handles/months/month-list.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Table } from '@/libraries/common';
import { MonthItem } from '@/types';
import { MonthModal } from '@/views/manager/month-modal';
import { MonthColumn } from '@/views/manager/month.column';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function MonthsPage() {
  const { data, loading, itemNeedDelete, onEdit, onDelete, setItemNeedDelete, onConfirmDelete } =
    MonthListUtils();
  const { actions } = useTopBar();
  const router = useRouter();

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Months',
      actions: [
        <Button
          key="add"
          text="Add month"
          size="sm"
          variant="neutral"
          onClick={() => router.push(`${RouterPaths.Manager}/add`)}
        />
      ]
    });
  }, []);

  return (
    <div>
      <Table<MonthItem>
        columns={MonthColumn({
          onDelete,
          onEdit
        })}
        data={data}
        loading={loading}
        customClass={{ wrap: 'h-full', table: 'table-pin-cols' }}
      />
      <MonthModal
        isOpen={!!itemNeedDelete}
        onClose={() => setItemNeedDelete(null)}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}

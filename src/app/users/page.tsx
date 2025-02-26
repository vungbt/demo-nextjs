'use client';
import { RouterPaths } from '@/constants/common';
import UserListUtils from '@/handles/users/user-list.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Table } from '@/libraries/common';
import { UserItem } from '@/types';
import { UserModal } from '@/views/user/user-modal';
import { UserColumn } from '@/views/user/user.column';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function UsersPage() {
  const { data, loading, itemNeedDelete, onEdit, onDelete, setItemNeedDelete, onConfirmDelete } =
    UserListUtils();
  const { actions } = useTopBar();
  const router = useRouter();

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Users',
      actions: [
        <Button
          key="add"
          text="Add user"
          size="sm"
          variant="neutral"
          onClick={() => router.push(`${RouterPaths.Users}/add`)}
        />
      ]
    });
  }, []);

  return (
    <div>
      <div className="max-h-[calc(100vh-64px)] overflow-auto">
        <Table<UserItem>
          columns={UserColumn({
            onDelete,
            onEdit
          })}
          data={data}
          loading={loading}
          customClass={{ wrap: 'h-full', table: 'table-pin-cols' }}
        />
      </div>
      <UserModal
        isOpen={!!itemNeedDelete}
        onClose={() => setItemNeedDelete(null)}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}

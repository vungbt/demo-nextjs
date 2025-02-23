'use client';
import { RouterPaths } from '@/constants/common';
import ConfigListUtils from '@/handles/configs/config-list.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Table } from '@/libraries/common';
import { ConfigItem } from '@/types/configs';
import { ConfigModal } from '@/views/config/config-modal';
import { ConfigColumn } from '@/views/config/config.column';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ConfigPage() {
  const { data, loading, itemNeedDelete, onEdit, onDelete, setItemNeedDelete, onConfirmDelete } =
    ConfigListUtils();
  const { actions } = useTopBar();
  const router = useRouter();

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Configs',
      actions: [
        <Button
          key="add"
          text="Add config"
          size="sm"
          variant="neutral"
          onClick={() => router.push(`${RouterPaths.Configs}/add`)}
        />
      ]
    });
  }, []);

  return (
    <div>
      <Table<ConfigItem>
        columns={ConfigColumn({
          onDelete,
          onEdit
        })}
        data={data}
        loading={loading}
        customClass={{ wrap: 'h-full', table: 'table-pin-cols' }}
      />
      <ConfigModal
        isOpen={!!itemNeedDelete}
        onClose={() => setItemNeedDelete(null)}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}

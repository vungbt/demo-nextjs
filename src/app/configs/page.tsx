'use client';
import { RouterPaths } from '@/constants/common';
import ConfigListUtils from '@/handles/configs/config-list.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, CellView, Table } from '@/libraries/common';
import CellActions from '@/libraries/common/table/cell-actions';
import { CellLink } from '@/libraries/common/table/cell-link';
import { ConfigItem } from '@/types/configs';
import { formatDate, formatPrice } from '@/utils/helpers/formatter';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ConfigPage() {
  const { data, loading, onEdit, onDelete } = ConfigListUtils();
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

  const columns: ColumnDef<ConfigItem>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: (props) => <CellView className="capitalize font-bold" content={props.row.original.id} />
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (props) => (
        <CellLink
          href={`${RouterPaths.Configs}/${props.row.original.id}`}
          className="capitalize"
          content={props.row.original.type}
        />
      )
    },
    {
      accessorKey: 'room_fee',
      header: 'Room fee',
      cell: (props) => <CellView content={formatPrice(props.row.original.room_fee)} />
    },
    {
      accessorKey: 'water_fee',
      header: 'Water fee',
      cell: (props) => <CellView content={formatPrice(props.row.original.water_fee)} />
    },
    {
      accessorKey: 'electric_fee',
      header: 'Electric fee',
      cell: (props) => <CellView content={formatPrice(props.row.original.electric_fee)} />
    },
    {
      accessorKey: 'common_service_fee',
      header: 'Common service fee',
      cell: (props) => <CellView content={formatPrice(props.row.original.common_service_fee)} />
    },
    {
      accessorKey: 'internet_fee',
      header: 'Internet fee',
      cell: (props) => <CellView content={formatPrice(props.row.original.internet_fee)} />
    },
    {
      accessorKey: 'is_special_room',
      header: 'Special room',
      cell: (props) => (
        <CellView content={props.row.original.is_special_room ? 'Special' : 'Normal'} />
      )
    },
    {
      accessorKey: 'created_at',
      header: 'Created at',
      cell: (props) => <CellView content={formatDate(props.row.original.created_at)} />
    },
    {
      accessorKey: 'action',
      header: 'Actions',
      cell: (props) => (
        <CellActions
          onEdit={() => onEdit(props.row.original)}
          onDelete={() => onDelete(props.row.original)}
        />
      )
    }
  ];

  return (
    <div>
      <Table<ConfigItem>
        columns={columns}
        data={data}
        loading={loading}
        customClass={{ wrap: 'h-96', table: 'table-pin-cols' }}
      />
    </div>
  );
}

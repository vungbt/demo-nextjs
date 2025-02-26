import { ConfigTypeLabels, RouterPaths } from '@/constants/common';
import { CellLink, CellView } from '@/libraries/common';
import CellActions from '@/libraries/common/table/cell-actions';
import { EConfigType, RoomItem } from '@/types';
import { formatDate } from '@/utils/helpers/formatter';
import { ColumnDef } from '@tanstack/react-table';

export const RoomColumn = ({
  onEdit,
  onDelete
}: {
  onEdit: (item: RoomItem) => void;
  onDelete: (item: RoomItem) => void;
}): ColumnDef<RoomItem>[] => {
  return [
    {
      accessorKey: 'id',
      header: '#',
      cell: (props) => <CellView className="capitalize font-bold" content={props.row.id} />
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (props) => (
        <CellLink
          href={`${RouterPaths.Rooms}/${props.row.original.id}`}
          content={props.row.original.name}
        />
      )
    },
    {
      accessorKey: 'config',
      header: 'Room type',
      cell: (props) => (
        <CellView
          content={ConfigTypeLabels[props.row.original.config?.type || EConfigType.Deluxe]}
        />
      )
    },
    {
      accessorKey: 'users',
      header: 'Members',
      cell: (props) => <CellView content={props.row.original.users.length} />
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
};

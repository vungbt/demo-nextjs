import { RouterPaths } from '@/constants/common';
import { CellLink, CellView } from '@/libraries/common';
import CellActions from '@/libraries/common/table/cell-actions';
import { UserItem } from '@/types';
import { formatDate } from '@/utils/helpers/formatter';
import { ColumnDef } from '@tanstack/react-table';

export const UserColumn = ({
  onEdit,
  onDelete
}: {
  onEdit: (item: UserItem) => void;
  onDelete: (item: UserItem) => void;
}): ColumnDef<UserItem>[] => {
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
          href={`${RouterPaths.Users}/${props.row.original.id}`}
          content={props.row.original.name}
        />
      )
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: (props) => <CellView content={props.row.original.phone} />
    },
    {
      accessorKey: 'address',
      header: 'Adress',
      cell: (props) => <CellView content={props.row.original.address} />
    },
    {
      accessorKey: 'cccd',
      header: 'CCCD/CMND',
      cell: (props) => <CellView content={props.row.original.cccd} />
    },
    {
      accessorKey: 'room',
      header: 'Room',
      cell: (props) => <CellView content={props.row.original.room?.name || ''} />
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

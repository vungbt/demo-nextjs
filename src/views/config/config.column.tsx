import { RouterPaths } from '@/constants/common';
import { CellLink, CellView } from '@/libraries/common';
import CellActions from '@/libraries/common/table/cell-actions';
import { CellConfig } from '@/libraries/common/table/cell-config';
import { ConfigItem } from '@/types/configs';
import { formatDate, formatPrice } from '@/utils/helpers/formatter';
import { ColumnDef } from '@tanstack/react-table';

export const ConfigColumn = ({
  onEdit,
  onDelete
}: {
  onEdit: (item: ConfigItem) => void;
  onDelete: (item: ConfigItem) => void;
}): ColumnDef<ConfigItem>[] => {
  return [
    {
      accessorKey: 'id',
      header: '#',
      cell: (props) => (
        <CellLink
          href={`${RouterPaths.Configs}/${props.row.original.id}`}
          className="capitalize font-bold"
          content={props.row.id}
        />
      )
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (props) => <CellConfig type={props.row.original.type} />
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
};

import { RouterPaths } from '@/constants/common';
import { CellLink, CellView } from '@/libraries/common';
import CellActions from '@/libraries/common/table/cell-actions';
import { CellConfig } from '@/libraries/common/table/cell-config';
import { EConfigType, MonthItem, MonthLabels } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const MonthColumn = ({
  onEdit,
  onDelete,
  onDetail
}: {
  onEdit: (item: MonthItem) => void;
  onDelete: (item: MonthItem) => void;
  onDetail: (item: MonthItem) => void;
}): ColumnDef<MonthItem>[] => {
  return [
    {
      accessorKey: 'id',
      header: '#',
      cell: (props) => (
        <CellLink
          href={`${RouterPaths.Manager}/${props.row.original.id}`}
          className="capitalize font-bold"
          content={props.row.id}
        />
      )
    },
    {
      accessorKey: 'old_electric_number',
      header: 'Old electric',
      cell: (props) => <CellView content={props.row.original.old_electric_number} />
    },
    {
      accessorKey: 'new_electric_number',
      header: 'New electric',
      cell: (props) => <CellView content={props.row.original.new_electric_number} />
    },
    {
      accessorKey: 'old_water_number',
      header: 'Old water',
      cell: (props) => <CellView content={props.row.original.old_water_number} />
    },
    {
      accessorKey: 'new_water_number',
      header: 'New water',
      cell: (props) => <CellView content={props.row.original.new_water_number} />
    },
    {
      accessorKey: 'room',
      header: 'Room',
      cell: (props) => <CellView content={props.row.original.room.name} />
    },
    {
      accessorKey: 'type',
      header: 'Room type',
      cell: (props) => (
        <CellConfig type={props.row.original.room.config?.type || EConfigType.Deluxe} />
      )
    },
    {
      accessorKey: 'month',
      header: 'Month',
      cell: (props) => <CellView content={MonthLabels[`${props.row.original.month}`]} />
    },
    {
      accessorKey: 'action',
      header: 'Actions',
      cell: (props) => (
        <CellActions
          onEdit={() => onEdit(props.row.original)}
          onDelete={() => onDelete(props.row.original)}
          onView={() => onDetail(props.row.original)}
        />
      )
    }
  ];
};

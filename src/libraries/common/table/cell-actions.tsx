import { RenderIcon } from '@/libraries/icons';
import clsx from 'clsx';

type CellActionProps = {
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
};
export default function CellActions({ className, onEdit, onDelete, onView }: CellActionProps) {
  return (
    <div className={clsx(className, 'flex items-center gap-2')}>
      {onEdit && (
        <span className="tooltip" data-tip="Edit">
          <button className="btn btn-square btn-xs btn-outline btn-warning" onClick={onEdit}>
            <RenderIcon name="edit" className="!w-3 !h-3" />
          </button>
        </span>
      )}
      {onDelete && (
        <span className="tooltip" data-tip="Delete">
          <button className="btn btn-square btn-xs btn-outline btn-error" onClick={onDelete}>
            <RenderIcon name="trash" className="!w-3 !h-3" />
          </button>
        </span>
      )}
      {onView && (
        <span className="tooltip" data-tip="View detail">
          <button className="btn btn-square btn-xs btn-outline btn-info" onClick={onView}>
            <RenderIcon name="eye" className="!w-3 !h-3" />
          </button>
        </span>
      )}
    </div>
  );
}

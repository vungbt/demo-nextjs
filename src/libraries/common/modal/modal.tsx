import clsx from 'clsx';
import React, { ReactNode, useEffect } from 'react';
import { Button } from '../button';
import { RenderIcon } from '@/libraries/icons';

type ModalWrapProps = {
  id: string;
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  customClass?: { wrap?: string; content?: string };
  onClose?: () => void;
  onConfirm?: () => void;
};

export function ModalWrap({
  id = 'modal_wrap',
  isOpen,
  onClose,
  onConfirm,
  children,
  className,
  customClass
}: ModalWrapProps) {
  useEffect(() => {
    if (id && document) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const modalValid = document?.getElementById(id) as any;
      if (isOpen) {
        modalValid?.showModal();
      } else {
        modalValid?.close();
      }
    }
  }, [id, isOpen]);

  return (
    <dialog id={id} className={clsx('modal', className, customClass?.wrap)}>
      <div className={clsx('modal-box', customClass?.wrap)}>
        {/* header */}
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-content border border-none outline-none"
          >
            <RenderIcon name="close-circle" />
          </button>
        </div>
        {children}
        {/* footer */}
        <div className="w-full flex items-center justify-end gap-2">
          <Button text="Cancel" size="sm" onClick={onClose} />
          {onConfirm && <Button text="Confirm" size="sm" variant="primary" onClick={onConfirm} />}
        </div>
      </div>

      {/* backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

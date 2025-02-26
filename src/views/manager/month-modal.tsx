import { ModalWrap } from '@/libraries/common/modal';
import React from 'react';

type MonthModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
};
export function MonthModal({ onClose, onConfirm, isOpen }: MonthModalProps) {
  return (
    <ModalWrap id="month_modal" isOpen={isOpen} onClose={onClose} onConfirm={onConfirm}>
      MonthModal
    </ModalWrap>
  );
}

import { ModalWrap } from '@/libraries/common/modal';
import React from 'react';

type ConfigModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
};
export function ConfigModal({ onClose, onConfirm, isOpen }: ConfigModalProps) {
  return (
    <ModalWrap id="config_modal" isOpen={isOpen} onClose={onClose} onConfirm={onConfirm}>
      ConfigModal
    </ModalWrap>
  );
}

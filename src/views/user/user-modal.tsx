import { ModalWrap } from '@/libraries/common/modal';
import React from 'react';

type UserModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
};
export function UserModal({ onClose, onConfirm, isOpen }: UserModalProps) {
  return (
    <ModalWrap id="user_modal" isOpen={isOpen} onClose={onClose} onConfirm={onConfirm}>
      UserModal
    </ModalWrap>
  );
}

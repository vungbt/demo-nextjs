import { ModalWrap } from '@/libraries/common/modal';
import React from 'react';

type RoomModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
};
export function RoomModal({ onClose, onConfirm, isOpen }: RoomModalProps) {
  return (
    <ModalWrap id="user_modal" isOpen={isOpen} onClose={onClose} onConfirm={onConfirm}>
      RoomModal
    </ModalWrap>
  );
}

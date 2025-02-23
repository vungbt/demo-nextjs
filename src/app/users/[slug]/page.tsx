'use client';
import UserDetailUtils from '@/handles/users/user-detail.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Input, Select, Textarea } from '@/libraries/common';
import { useEffect } from 'react';

export default function UserDetailPage() {
  const { actions } = useTopBar();
  const { onSave, onSubmit, reactForm, submitButtonRef, roomOptions } = UserDetailUtils();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = reactForm;

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Add Users',
      actions: [<Button key="add" text="Save" size="sm" variant="neutral" onClick={onSave} />]
    });
  }, [onSave]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full grid grid-cols-12 gap-5 items-start">
          <Input
            label="Name"
            error={errors.name?.message}
            required
            placeholder="Room fee"
            customClass={{ wrap: 'col-span-3' }}
            {...register('name')}
          />

          <Input
            label="Phone"
            error={errors.phone?.message}
            required
            placeholder="Water fee"
            customClass={{ wrap: 'col-span-3' }}
            {...register('phone')}
          />

          <Input
            label="CCCD/CMND"
            error={errors.cccd?.message}
            required
            placeholder="Common service fee"
            customClass={{ wrap: 'col-span-3' }}
            {...register('cccd')}
          />

          <Select
            label="Room"
            error={errors.room_id?.message}
            required
            options={roomOptions}
            placeholder="Select a room"
            customClass={{ wrap: 'col-span-3' }}
            {...register('room_id')}
          />

          <Textarea
            label="Address"
            error={errors.address?.message}
            required
            placeholder="Address"
            customClass={{ wrap: 'col-span-12' }}
            {...register('address')}
          />
        </div>

        {/* submit */}
        <button ref={submitButtonRef} type="submit" />
      </form>
    </div>
  );
}

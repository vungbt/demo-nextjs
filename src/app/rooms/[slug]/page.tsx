'use client';
import RoomDetailUtils from '@/handles/rooms/room-detail.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Input, Select } from '@/libraries/common';
import { useEffect } from 'react';

export default function RoomDetailPage() {
  const { actions } = useTopBar();
  const { onSave, onSubmit, reactForm, submitButtonRef, configOptions } = RoomDetailUtils();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = reactForm;

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Add Rooms',
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

          <Select
            label="Room"
            error={errors.config_id?.message}
            required
            options={configOptions}
            placeholder="Select a config"
            customClass={{ wrap: 'col-span-3' }}
            {...register('config_id')}
          />
        </div>

        {/* submit */}
        <button ref={submitButtonRef} type="submit" />
      </form>
    </div>
  );
}

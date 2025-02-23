'use client';
import { ConfigTypeOptions } from '@/constants/common';
import ConfigDetailUtils from '@/handles/configs/config-detail.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Input, Select, Toggle } from '@/libraries/common';
import { useEffect } from 'react';

export default function ConfigDetailPage() {
  const { actions } = useTopBar();
  const { onSave, onSubmit, reactForm, submitButtonRef } = ConfigDetailUtils();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = reactForm;

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Add Configs',
      actions: [<Button key="add" text="Save" size="sm" variant="neutral" onClick={onSave} />]
    });
  }, [onSave]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full grid grid-cols-12 gap-5 items-start">
          <Input
            label="Room fee"
            error={errors.room_fee?.message}
            required
            placeholder="Room fee"
            customClass={{ wrap: 'col-span-3' }}
            {...register('room_fee')}
          />

          <Input
            label="Water fee"
            error={errors.water_fee?.message}
            required
            placeholder="Water fee"
            customClass={{ wrap: 'col-span-3' }}
            {...register('water_fee')}
          />

          <Input
            label="Electric fee"
            error={errors.electric_fee?.message}
            required
            placeholder="Electric fee"
            customClass={{ wrap: 'col-span-3' }}
            {...register('electric_fee')}
          />

          <Input
            label="Common service fee"
            error={errors.common_service_fee?.message}
            required
            placeholder="Common service fee"
            customClass={{ wrap: 'col-span-3' }}
            {...register('common_service_fee')}
          />

          <Input
            label="Internet fee"
            error={errors.internet_fee?.message}
            required
            placeholder="Internet fee"
            customClass={{ wrap: 'col-span-3' }}
            {...register('internet_fee')}
          />

          <Select
            label="Room type"
            error={errors.type?.message}
            required
            options={ConfigTypeOptions}
            placeholder="Room type"
            customClass={{ wrap: 'col-span-3' }}
            {...register('type')}
          />

          <Toggle
            customClass={{ wrap: 'col-span-12' }}
            label="Special room"
            {...register('is_special_room')}
          />
        </div>

        {/* submit */}
        <button ref={submitButtonRef} type="submit" />
      </form>
    </div>
  );
}

'use client';
import MonthDetailUtils from '@/handles/months/month-detail.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Input, Select } from '@/libraries/common';
import { MonthOptions } from '@/types';
import { useEffect } from 'react';

export default function MonthDetailPage() {
  const { actions } = useTopBar();
  const { onSave, onSubmit, reactForm, submitButtonRef } = MonthDetailUtils();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = reactForm;

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Add Months',
      actions: [<Button key="add" text="Save" size="sm" variant="neutral" onClick={onSave} />]
    });
  }, [onSave]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full grid grid-cols-12 gap-5 items-start">
          <Input
            label="Name"
            error={errors.old_electric_number?.message}
            required
            type="number"
            min={1}
            placeholder="Old electric"
            customClass={{ wrap: 'col-span-3' }}
            {...register('old_electric_number')}
          />

          <Select
            label="Month"
            error={errors.month?.message}
            required
            options={MonthOptions}
            placeholder="Select a month"
            customClass={{ wrap: 'col-span-3' }}
            {...register('month')}
          />
        </div>

        {/* submit */}
        <button ref={submitButtonRef} type="submit" />
      </form>
    </div>
  );
}

'use client';
import MonthDetailUtils from '@/handles/months/month-detail.utils';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Input, Select } from '@/libraries/common';
import { RenderIcon } from '@/libraries/icons';
import { MonthOptions } from '@/types';
import clsx from 'clsx';
import { useEffect } from 'react';

export default function MonthDetailPage() {
  const { actions } = useTopBar();
  const { onSave, onSubmit, reactForm, reactFormArray, submitButtonRef } = MonthDetailUtils();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = reactForm;
  const { fields, remove } = reactFormArray;

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Add Months',
      actions: [<Button key="add" text="Save" size="sm" variant="neutral" onClick={onSave} />]
    });
  }, [onSave]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
        {fields.map((field, index) => {
          return (
            <div
              key={field.id}
              className={clsx(
                'w-full grid items-center grid-cols-[repeat(13,minmax(0,1fr))] gap-5',
                {
                  'border-b border-dashed border-gray-400 pb-5': index < fields.length
                }
              )}
            >
              <Input
                label="Old electric"
                error={errors?.readings?.[index]?.old_electric_number?.message}
                required
                type="number"
                min={1}
                disabled
                placeholder="Old electric"
                customClass={{ wrap: 'col-span-2' }}
                {...register(`readings.${index}.old_electric_number`)}
              />

              <Input
                label="New electric"
                error={errors?.readings?.[index]?.new_electric_number?.message}
                required
                type="number"
                min={1}
                placeholder="New electric"
                customClass={{ wrap: 'col-span-2' }}
                {...register(`readings.${index}.new_electric_number`)}
              />

              <Input
                label="Old water"
                error={errors?.readings?.[index]?.old_water_number?.message}
                required
                disabled
                type="number"
                min={1}
                placeholder="Old water"
                customClass={{ wrap: 'col-span-2' }}
                {...register(`readings.${index}.old_water_number`)}
              />

              <Input
                label="New water"
                error={errors?.readings?.[index]?.new_water_number?.message}
                required
                type="number"
                min={1}
                placeholder="New water"
                customClass={{ wrap: 'col-span-2' }}
                {...register(`readings.${index}.new_water_number`)}
              />

              <Input
                label={`Room ${field.room_name}`}
                error={errors?.readings?.[index]?.room_id?.message}
                required
                disabled
                type="number"
                min={1}
                placeholder="Room"
                customClass={{ wrap: 'col-span-2' }}
                {...register(`readings.${index}.room_id`)}
              />

              <Select
                label="Month"
                error={errors?.readings?.[index]?.month?.message}
                required
                disabled
                options={MonthOptions}
                placeholder="Select a month"
                customClass={{ wrap: 'col-span-2' }}
                {...register(`readings.${index}.month`)}
              />

              <div className="col-span-1 flex flex-col items-end justify-center h-full">
                {/* fake label */}
                <div className="h-6" />
                <button
                  type="button"
                  className="btn btn-square btn-xs btn-outline btn-error"
                  onClick={() => remove(index)}
                >
                  <RenderIcon name="trash" className="!w-3 !h-3" />
                </button>
              </div>
            </div>
          );
        })}

        {/* submit */}
        <button ref={submitButtonRef} type="submit" />
      </form>
    </div>
  );
}

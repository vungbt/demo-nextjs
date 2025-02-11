'use client';
import { useTopBar } from '@/hooks/top-bar';
import { Button, Input } from '@/libraries/common';
import { ConfigBody, EConfigType } from '@/types/configs';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  room_fee: yup
    .number()
    .typeError('Room fee must be a number')
    .required('Room fee is required')
    .positive('Room fee must be a positive number')
    .integer('Room fee must be a whole number'),
  water_fee: yup
    .number()
    .typeError('Water fee must be a number')
    .required('Water fee is required')
    .positive('Water fee must be a positive number')
    .integer('Water fee must be a whole number'),
  electric_fee: yup
    .number()
    .typeError('Electric fee must be a number')
    .required('Electric fee is required')
    .positive('Electric fee must be a positive number')
    .integer('Electric fee must be a whole number'),
  common_service_fee: yup
    .number()
    .typeError('Common service fee must be a number')
    .required('Common service fee is required')
    .positive('Common service fee must be a positive number')
    .integer('Common service fee must be a whole number'),
  internet_fee: yup
    .number()
    .typeError('Internet fee must be a number')
    .required('Internet fee is required')
    .positive('Internet fee must be a positive number')
    .integer('Internet fee must be a whole number'),
  type: yup
    .mixed<EConfigType>()
    .oneOf(Object.values(EConfigType), 'Invalid room type')
    .required('Room type is required'),
  is_special_room: yup.boolean().optional()
});

export default function ConfigDetailPage() {
  const { actions } = useTopBar();

  // render top bar
  useEffect(() => {
    actions.setTopBar({
      label: 'Add Configs',
      actions: [<Button key="add" text="Save" size="sm" variant="neutral" />]
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ConfigBody>({
    defaultValues: { room_fee: undefined },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<ConfigBody> = (data) => {
    console.log('Search Query:', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Room fee"
          error={errors.room_fee?.message}
          required
          placeholder="Room fee"
          {...register('room_fee')}
        />

        <Input
          label="Water fee"
          error={errors.room_fee?.message}
          required
          placeholder="Water fee"
          {...register('water_fee')}
        />

        <Input
          label="Electric fee"
          error={errors.room_fee?.message}
          required
          placeholder="Electric fee"
          {...register('electric_fee')}
        />

        <Input
          label="Common service fee"
          error={errors.room_fee?.message}
          required
          placeholder="Common service fee"
          {...register('common_service_fee')}
        />

        <Input
          label="Internet fee"
          error={errors.room_fee?.message}
          required
          placeholder="Internet fee"
          {...register('internet_fee')}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

import { ConfigBody, EConfigType } from '@/types/configs';
import { yupResolver } from '@hookform/resolvers/yup';
import { RefObject, useCallback, useRef } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

type ConfigDetailUtilsResult = {
  onSave: () => void;
  onSubmit: (data: ConfigBody) => void;
  reactForm: UseFormReturn<ConfigBody>;
  submitButtonRef: RefObject<HTMLButtonElement>;
};

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

export default function ConfigDetailUtils(): ConfigDetailUtilsResult {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const onSave = useCallback(() => {
    submitButtonRef.current?.click();
  }, [submitButtonRef]);

  const reactForm = useForm<ConfigBody>({
    defaultValues: { room_fee: undefined, is_special_room: false, type: EConfigType.Deluxe },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<ConfigBody> = (data: ConfigBody) => {
    console.log('Search Query:', data);
  };

  return {
    reactForm,
    submitButtonRef,
    onSave,
    onSubmit
  };
}

import { RouterPaths } from '@/constants/common';
import { ESlugAction } from '@/types';
import { ConfigBody, ConfigItem, EConfigType } from '@/types/configs';
import { apiCreateConfig, apiGetConfig, apiUpdateConfig } from '@/utils/apis/configs';
import { toastError, toastSuccess } from '@/utils/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

type ConfigDetailUtilsResult = {
  onSave: () => void;
  onSubmit: (data: ConfigBody) => void;
  reactForm: UseFormReturn<ConfigBody>;
  configDetail: ConfigItem | null;
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
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const params = useParams<{ slug: string }>();
  const isAdd = params.slug === ESlugAction.Add;
  const configId = isAdd ? '' : params.slug;

  // detail
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [configDetail, setConfigDetail] = useState<ConfigItem | null>(null);

  useEffect(() => {
    if (configId) {
      fetchingDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configId]);

  const fetchingDetail = async () => {
    try {
      if (!configId || loadingDetail) return;
      setLoadingDetail(true);
      const res = await apiGetConfig(configId);
      setConfigDetail(res);
      setLoadingDetail(false);
    } catch {
      setLoadingDetail(false);
    }
  };

  const reactForm = useForm<ConfigBody>({
    defaultValues: { room_fee: undefined, is_special_room: false, type: EConfigType.Deluxe },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (configDetail && !isAdd) {
      reactForm.setValue('room_fee', configDetail.room_fee);
      reactForm.setValue('water_fee', configDetail.water_fee);
      reactForm.setValue('electric_fee', configDetail.electric_fee);
      reactForm.setValue('common_service_fee', configDetail.common_service_fee);
      reactForm.setValue('internet_fee', configDetail.internet_fee);
      reactForm.setValue('type', configDetail.type);
      reactForm.setValue('is_special_room', configDetail.is_special_room);
    }
  }, [configDetail, isAdd, reactForm]);

  const onSave = useCallback(() => {
    submitButtonRef.current?.click();
  }, [submitButtonRef]);

  const onSubmit: SubmitHandler<ConfigBody> = async (data: ConfigBody) => {
    if (isAdd) {
      const res = await apiCreateConfig(data);
      if (res && Object.keys(res).length > 0) {
        toastSuccess('Create config successfully.');
      } else {
        toastSuccess('Create config failed.');
      }
      return router.push(RouterPaths.Configs);
    } else {
      if (!configId) return toastError('Config item not found.');
      const res = await apiUpdateConfig(configId, data);
      if (res && Object.keys(res).length > 0) {
        toastSuccess('Edit config successfully.');
      } else {
        toastSuccess('Edit config failed.');
      }
      return router.push(RouterPaths.Configs);
    }
  };

  return {
    reactForm,
    configDetail,
    submitButtonRef,
    onSave,
    onSubmit
  };
}

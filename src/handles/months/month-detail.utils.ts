import { RouterPaths } from '@/constants/common';
import { EMonth, ESlugAction, MonthBody, MonthItem } from '@/types';
import { apiCreateMonth, apiGetMonth, apiUpdateMonth } from '@/utils/apis';
import { toastError, toastSuccess } from '@/utils/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

type MonthDetailUtilsResult = {
  onSave: () => void;
  onSubmit: (data: MonthBody) => void;
  reactForm: UseFormReturn<MonthBody>;
  monthDetail: MonthItem | null;
  submitButtonRef: RefObject<HTMLButtonElement>;
  loadingDetail: boolean;
};

const schema = yup.object().shape({
  old_electric_number: yup
    .number()
    .required('Old electric number must be required.')
    .min(1, 'Electric number must greater than 1.'),
  new_electric_number: yup
    .number()
    .required('New electric number be required.')
    .min(1, 'Electric number must greater than 1.'),
  new_water_number: yup
    .number()
    .required('New water number be required.')
    .min(1, 'Water number must greater than 1.'),
  old_water_number: yup
    .number()
    .required('Old water number be required.')
    .min(1, 'Water number must greater than 1.'),
  month: yup.number().required('Month must be required.').min(1, 'Month must be required.')
});

export default function MonthDetailUtils(): MonthDetailUtilsResult {
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const params = useParams<{ slug: string }>();
  const isAdd = params.slug === ESlugAction.Add;
  const monthId = isAdd ? '' : params.slug;

  // detail
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [monthDetail, setMonthDetail] = useState<MonthItem | null>(null);

  useEffect(() => {
    if (monthId) {
      fetchingDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthId]);

  const fetchingDetail = async () => {
    try {
      if (!monthId || loadingDetail) return;
      setLoadingDetail(true);
      const res = await apiGetMonth(monthId);
      setMonthDetail(res);
      setLoadingDetail(false);
    } catch {
      setLoadingDetail(false);
    }
  };

  const reactForm = useForm<MonthBody>({
    defaultValues: {
      old_electric_number: 1,
      new_electric_number: 1,
      new_water_number: 1,
      old_water_number: 1,
      month: EMonth.April
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (monthDetail && !isAdd) {
      reactForm.setValue('old_electric_number', monthDetail.old_electric_number);
      reactForm.setValue('new_electric_number', monthDetail.new_electric_number);
      reactForm.setValue('new_water_number', monthDetail.new_water_number);
      reactForm.setValue('old_water_number', monthDetail.old_water_number);
      reactForm.setValue('month', monthDetail.month);
    }
  }, [monthDetail, isAdd, reactForm]);

  const onSave = useCallback(() => {
    submitButtonRef.current?.click();
  }, [submitButtonRef]);

  const onSubmit: SubmitHandler<MonthBody> = async (data: MonthBody) => {
    if (isAdd) {
      const res = await apiCreateMonth(data);
      if (res && Object.keys(res).length > 0) {
        toastSuccess('Create month successfully.');
      } else {
        toastSuccess('Create month failed.');
      }
      return router.push(RouterPaths.Manager);
    } else {
      if (!monthId) return toastError('Month item not found.');
      const res = await apiUpdateMonth(monthId, data);
      if (res && Object.keys(res).length > 0) {
        toastSuccess('Edit month successfully.');
      } else {
        toastSuccess('Edit month failed.');
      }
      return router.push(RouterPaths.Manager);
    }
  };

  return {
    reactForm,
    monthDetail,
    submitButtonRef,
    loadingDetail,
    onSave,
    onSubmit
  };
}

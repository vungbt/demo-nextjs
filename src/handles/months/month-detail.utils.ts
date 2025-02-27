import { RouterPaths } from '@/constants/common';
import { ESlugAction, MonthBody, MonthItem } from '@/types';
import { apiCreateManyMonth, apiGetMonth, apiGetMonths } from '@/utils/apis';
import { toastSuccess } from '@/utils/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  SubmitHandler,
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn
} from 'react-hook-form';
import * as yup from 'yup';

type FormValues = {
  readings: MonthBody[];
};

type MonthDetailUtilsResult = {
  onSave: () => void;
  onSubmit: (data: FormValues) => void;
  reactForm: UseFormReturn<FormValues>;
  reactFormArray: UseFieldArrayReturn<FormValues, 'readings', 'id'>;
  monthDetail: MonthItem | null;
  submitButtonRef: RefObject<HTMLButtonElement>;
  loadingDetail: boolean;
  monthLatest: MonthItem[];
  loadingLatest: boolean;
  currentMonth: number;
  previousMonth: number;
};

const validationSchema: yup.ObjectSchema<FormValues> = yup.object().shape({
  readings: yup
    .array()
    .of(
      yup.object().shape({
        old_electric_number: yup
          .number()
          .typeError('Old electric number must be a number.')
          .required('Old electric number is required.')
          .min(1, 'Must be greater than 1.'),
        new_electric_number: yup
          .number()
          .typeError('New electric number must be a number.')
          .required('New electric number is required.')
          .min(1, 'Must be greater than 1.'),
        old_water_number: yup
          .number()
          .typeError('Old water number must be a number.')
          .required('Old water number is required.')
          .min(1, 'Must be greater than 1.'),
        new_water_number: yup
          .number()
          .typeError('New water number must be a number.')
          .required('New water number is required.')
          .min(1, 'Must be greater than 1.'),
        month: yup
          .number()
          .typeError('Month must be a number.')
          .required('Month is required.')
          .min(1, 'Must be at least 1.'),
        room_id: yup
          .number()
          .typeError('Room must be a number.')
          .required('Room is required.')
          .min(1, 'Must be at least 1.'),
        room_name: yup.string().optional()
      })
    )
    .required() // ✅ Ensures readings is always required
});

export default function MonthDetailUtils(): MonthDetailUtilsResult {
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const params = useParams<{ slug: string }>();
  const isAdd = params.slug === ESlugAction.Add;
  const monthId = isAdd ? '' : params.slug;
  const date = new Date();
  const previousMonth = date.getMonth() || 12;
  const currentMonth = previousMonth + 1;

  // detail
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [monthDetail, setMonthDetail] = useState<MonthItem | null>(null);

  // month latest
  const [loadingLatest, setLoadingLatest] = useState<boolean>(false);
  const [monthLatest, setMonthLatest] = useState<MonthItem[]>([]);

  useEffect(() => {
    fetchingMonthLatest();
  }, []);

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

  // fetching month latest
  const fetchingMonthLatest = async () => {
    try {
      if (loadingLatest) return;

      setLoadingLatest(true);
      const res = await apiGetMonths({ limit: 10, page: 1, month: previousMonth });
      const data = res.data;
      const initFormForNewMonth = data.map((item) => ({
        old_electric_number: item?.new_electric_number || 1,
        new_electric_number: 1,
        new_water_number: 1,
        old_water_number: item?.new_water_number || 1,
        room_id: item.room?.id,
        room_name: item.room?.name,
        month: currentMonth
      }));
      reactForm.setValue('readings', initFormForNewMonth);
      setMonthLatest(res.data);
      setLoadingLatest(false);
    } catch {
      setLoadingLatest(false);
    }
  };

  const reactForm = useForm<FormValues>({
    defaultValues: {
      readings: []
    },
    resolver: yupResolver(validationSchema)
  });

  const reactFormArray = useFieldArray({
    control: reactForm.control,
    name: 'readings'
  });

  useEffect(() => {
    if (monthDetail && !isAdd) {
      // reactForm.setValue(`readings.${index}.old_electric_number`, monthDetail.old_electric_number);
      // reactForm.setValue(`readings.${index}.old_electric_number`, monthDetail.new_electric_number);
      // reactForm.setValue('new_water_number', monthDetail.new_water_number);
      // reactForm.setValue('old_water_number', monthDetail.old_water_number);
      // reactForm.setValue('month', monthDetail.month);
    }
  }, [monthDetail, isAdd, reactForm]);

  const onSave = useCallback(() => {
    submitButtonRef.current?.click();
  }, [submitButtonRef]);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const body = (data.readings || []).map((item) => ({
      old_electric_number: item.old_electric_number,
      new_electric_number: item.new_electric_number,
      new_water_number: item.new_water_number,
      old_water_number: item.old_water_number,
      room_id: item.room_id,
      month: item.month
    }));

    if (isAdd) {
      const res = await apiCreateManyMonth(body);
      if (res && Object.keys(res).length > 0) {
        toastSuccess('Create month successfully.');
      } else {
        toastSuccess('Create month failed.');
      }
      return router.push(RouterPaths.Manager);
    } else {
      toastSuccess('COMING SOON');

      // const res = await apiUpdateMonth(monthId, data);
      // if (res && Object.keys(res).length > 0) {
      //   toastSuccess('Edit month successfully.');
      // } else {
      //   toastSuccess('Edit month failed.');
      // }
      // return router.push(RouterPaths.Manager);
    }
  };

  return {
    reactForm,
    reactFormArray,
    monthLatest,
    loadingLatest,
    monthDetail,
    currentMonth,
    previousMonth,
    submitButtonRef,
    loadingDetail,
    onSave,
    onSubmit
  };
}

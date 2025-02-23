import { RouterPaths } from '@/constants/common';
import useConfigs from '@/hooks/config';
import { SelectOptionItem } from '@/libraries/common';
import { ESlugAction } from '@/types';
import { RoomBody, RoomItem } from '@/types';
import { apiCreateRoom, apiGetRoom, apiUpdateRoom } from '@/utils/apis';
import { toastError, toastSuccess } from '@/utils/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

type RoomDetailUtilsResult = {
  onSave: () => void;
  onSubmit: (data: RoomBody) => void;
  reactForm: UseFormReturn<RoomBody>;
  configDetail: RoomItem | null;
  submitButtonRef: RefObject<HTMLButtonElement>;

  configOptions: SelectOptionItem[];
  loadingConfigs: boolean;
};

const schema = yup.object().shape({
  name: yup.string().required('Name must be required.').min(1, 'Name must be required.'),
  config_id: yup.number().required('Config ID must be required.')
});

export default function RoomDetailUtils(): RoomDetailUtilsResult {
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const params = useParams<{ slug: string }>();
  const isAdd = params.slug === ESlugAction.Add;
  const roomId = isAdd ? '' : params.slug;

  // detail
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [configDetail, setRoomDetail] = useState<RoomItem | null>(null);

  const { configOptions, loading: loadingConfigs } = useConfigs();

  useEffect(() => {
    if (roomId) {
      fetchingDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const fetchingDetail = async () => {
    try {
      if (!roomId || loadingDetail) return;
      setLoadingDetail(true);
      const res = await apiGetRoom(roomId);
      setRoomDetail(res);
      setLoadingDetail(false);
    } catch {
      setLoadingDetail(false);
    }
  };

  const reactForm = useForm<RoomBody>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (configOptions && configOptions.length > 0 && isAdd) {
      reactForm.setValue('config_id', Number(configOptions[0].value));
    }
  }, [isAdd, reactForm, configOptions]);

  useEffect(() => {
    if (configDetail && !isAdd) {
      reactForm.setValue('name', configDetail.name);
      reactForm.setValue('config_id', configDetail.config_id);
    }
  }, [configDetail, isAdd, reactForm]);

  const onSave = useCallback(() => {
    submitButtonRef.current?.click();
  }, [submitButtonRef]);

  const onSubmit: SubmitHandler<RoomBody> = async (data: RoomBody) => {
    if (isAdd) {
      const res = await apiCreateRoom(data);
      if (res && Object.keys(res).length > 0) {
        toastSuccess('Create room successfully.');
      } else {
        toastSuccess('Create room failed.');
      }
      return router.push(RouterPaths.Rooms);
    } else {
      if (!roomId) return toastError('Room item not found.');
      const res = await apiUpdateRoom(roomId, data);
      if (res && Object.keys(res).length > 0) {
        toastSuccess('Edit room successfully.');
      } else {
        toastSuccess('Edit room failed.');
      }
      return router.push(RouterPaths.Rooms);
    }
  };

  return {
    reactForm,
    configDetail,
    submitButtonRef,
    configOptions,
    loadingConfigs,
    onSave,
    onSubmit
  };
}

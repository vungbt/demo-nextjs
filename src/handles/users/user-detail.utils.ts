import { RouterPaths } from '@/constants/common';
import useRooms from '@/hooks/room';
import { SelectOptionItem } from '@/libraries/common';
import { ESlugAction } from '@/types';
import { UserBody, UserItem } from '@/types';
import { apiCreateUser, apiGetUser, apiUpdateUser } from '@/utils/apis';
import { toastError, toastSuccess } from '@/utils/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

type UserDetailUtilsResult = {
  onSave: () => void;
  onSubmit: (data: UserBody) => void;
  reactForm: UseFormReturn<UserBody>;
  userDetail: UserItem | null;
  submitButtonRef: RefObject<HTMLButtonElement>;
  roomOptions: SelectOptionItem[];
  loadingRooms: boolean;
};

const schema = yup.object().shape({
  name: yup.string().required('Name must be required.').min(1, 'Name must be required.'),
  phone: yup.string().required('Phone must be required.').min(1, 'Phone must be required.'),
  address: yup.string().required('Address must be required.').min(1, 'Address must be required.'),
  cccd: yup.string().required('CCCD/CMND must be required.').min(1, 'CCCD/CMND must be required.'),
  room_id: yup.number().required('Room ID must be required.')
});

export default function UserDetailUtils(): UserDetailUtilsResult {
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const params = useParams<{ slug: string }>();
  const isAdd = params.slug === ESlugAction.Add;
  const userId = isAdd ? '' : params.slug;

  // detail
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<UserItem | null>(null);
  const { roomOptions, loading: loadingRooms } = useRooms();

  useEffect(() => {
    if (userId) {
      fetchingDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchingDetail = async () => {
    try {
      if (!userId || loadingDetail) return;
      setLoadingDetail(true);
      const res = await apiGetUser(userId);
      setUserDetail(res);
      setLoadingDetail(false);
    } catch {
      setLoadingDetail(false);
    }
  };

  const reactForm = useForm<UserBody>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      cccd: ''
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (roomOptions && roomOptions.length > 0 && isAdd) {
      reactForm.setValue('room_id', Number(roomOptions[0].value));
    }
  }, [isAdd, reactForm, roomOptions]);

  useEffect(() => {
    if (userDetail && !isAdd) {
      console.log('userDetail===>', userDetail);
      reactForm.setValue('name', userDetail.name);
      reactForm.setValue('address', userDetail.address);
      reactForm.setValue('phone', userDetail.phone);
      reactForm.setValue('cccd', userDetail.cccd);
      reactForm.setValue('room_id', userDetail.room_id);
    }
  }, [userDetail, isAdd, reactForm]);

  const onSave = useCallback(() => {
    submitButtonRef.current?.click();
  }, [submitButtonRef]);

  const onSubmit: SubmitHandler<UserBody> = async (data: UserBody) => {
    if (isAdd) {
      const res = await apiCreateUser(data);
      if (res && Object.keys(res).length > 0) {
        toastSuccess('Create user successfully.');
      } else {
        toastSuccess('Create user failed.');
      }
      return router.push(RouterPaths.Users);
    } else {
      if (!userId) return toastError('User item not found.');
      const res = await apiUpdateUser(userId, data);
      if (res && Object.keys(res).length > 0) {
        toastSuccess('Edit user successfully.');
      } else {
        toastSuccess('Edit user failed.');
      }
      return router.push(RouterPaths.Users);
    }
  };

  return {
    reactForm,
    userDetail,
    submitButtonRef,
    roomOptions,
    loadingRooms,
    onSave,
    onSubmit
  };
}

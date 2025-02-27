'use client';
import MonthBillUtils from '@/handles/months/month-bill.utils';
import { Select } from '@/libraries/common';
import { MonthOptions } from '@/types';
import { EDateFormat, formatDate } from '@/utils/helpers/formatter';
import clsx from 'clsx';

export default function BillingPage() {
  const {
    tableData,
    members = [],
    roomId,
    monthId,
    roomOptions,
    onChangeRoom,
    onChangeMonth
  } = MonthBillUtils();

  return (
    <>
      {/* filter by month */}
      <div className="grid grid-cols-12 w-full">
        <span className="col-span-3">
          <Select
            defaultValue={monthId}
            options={MonthOptions}
            placeholder="Select a month"
            onChange={(e) => onChangeMonth(e.target.value !== '-' ? Number(e.target.value) : -1)}
          />
        </span>
      </div>
      <div className="flex w-full justify-center">
        {/* main content */}
        <div className="flex flex-col items-center justify-center w-full max-w-full xl:max-w-[85%]">
          <p className="font-bold text-xl">THÔNG BÁO TIỀN PHÒNG TRỌ</p>
          <p className="text-base font-semibold mt-1">
            Tháng {formatDate(new Date(), EDateFormat.MM_YYYY)}
          </p>

          {/* members in room */}
          <div className="grid grid-cols-12 w-full mt-4">
            <span className="col-span-2 text-start">Kính gửi:</span>
            <span className="col-span-10 font-semibold">
              {members.map((item) => item.name).join(', ')}
            </span>
          </div>

          {/* room */}
          <div className="grid grid-cols-12 w-full mt-4">
            <span className="col-span-2 text-start flex items-center">Ở phòng số:</span>
            <span className="col-span-3">
              <Select
                defaultValue={roomId}
                options={[{ label: 'Select a room', value: '-' }].concat(roomOptions)}
                placeholder="Select a room"
                onChange={(e) => onChangeRoom(e.target.value !== '-' ? Number(e.target.value) : -1)}
              />
            </span>
          </div>
          {/* 
        <Select
          label="Month"
          error={errors?.readings?.[index]?.month?.message}
          required
          disabled
          options={MonthOptions}
          placeholder="Select a month"
          customClass={{ wrap: 'col-span-2' }}
          {...register(`readings.${index}.month`)}
        /> */}

          {/* tables */}
          <div className="w-full border border-solid border-gray-800 rounded mt-4">
            {/* header */}
            <div className="grid grid-cols-12">
              <span className="col-span-1 text-center border-r border-solid border-gray-800 p-2 font-semibold">
                STT
              </span>
              <span className="col-span-2 text-center border-r border-solid border-gray-800 p-2 font-semibold">
                Khoản
              </span>
              <span className="col-span-6 text-center border-r border-solid border-gray-800 p-2 font-semibold">
                Chi tiết
              </span>
              <span className="col-span-3 text-center p-2 font-semibold">Thành Tiền</span>
            </div>

            {/* content */}
            {tableData.map((item, index) => {
              return (
                <div
                  className={clsx('grid grid-cols-12 border-t border-solid border-gray-800', {
                    'font-bold': index === tableData.length - 1
                  })}
                  key={index}
                >
                  <span className="col-span-1 text-center border-r border-solid border-gray-800 p-2">
                    {item.id}
                  </span>
                  <span className="col-span-2 text-center border-r border-solid border-gray-800 p-2">
                    {item.label}
                  </span>
                  <span
                    className={clsx(
                      'col-span-6 text-center border-r border-solid border-gray-800 p-2',
                      {
                        'text-end': index === tableData.length - 1
                      }
                    )}
                  >
                    {item.detail}
                  </span>
                  <span className="col-span-3 text-center p-2">{item.price}</span>
                </div>
              );
            })}
          </div>

          {/* total bill */}
        </div>
      </div>
    </>
  );
}

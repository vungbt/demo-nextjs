'use client';
import ConfigListUtils from '@/handles/configs/config-list.utils';
import { Table } from '@/libraries/common';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

type User = {
  id: number;
  name: string;
  job: string;
  company: string;
  location: string;
  lastLogin: string;
  favoriteColor: string;
};

export default function ConfigPage() {
  const { loading } = ConfigListUtils();

  const columns: ColumnDef<User>[] = [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'job', header: 'Job' },
    { accessorKey: 'company', header: 'Company' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'lastLogin', header: 'Last Login' },
    { accessorKey: 'favoriteColor', header: 'Favorite Color' }
  ];

  const data: User[] = [
    {
      id: 1,
      name: 'Yancy Tear',
      job: 'Community Outreach Specialist',
      company: 'Wyman-Ledner',
      location: 'Brazil',
      lastLogin: '5/22/2020',
      favoriteColor: 'Indigo'
    }
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        customClass={{ wrap: 'h-96', table: 'table-pin-cols' }}
      />
    </div>
  );
}

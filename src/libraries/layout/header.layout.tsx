import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import Logo from '../logo';
import { IconName, RenderIcon } from '../icons';
import { RouterPaths } from '@/constants/common';
import { Button } from '../common';

type HeaderLayoutProps = {
  className?: string;
};

type MenuItem = {
  name: string;
  path: string;
  icon: IconName;
};

export default function HeaderLayout({ className }: HeaderLayoutProps) {
  const menus: MenuItem[] = [
    { name: 'Home', path: RouterPaths.Home, icon: 'home' },
    { name: 'Manager', path: RouterPaths.Manager, icon: 'chart' },
    { name: 'Users', path: RouterPaths.Users, icon: 'users' },
    { name: 'Rooms', path: RouterPaths.Rooms, icon: 'house' },
    { name: 'Configs', path: RouterPaths.Configs, icon: 'setting' }
  ];
  return (
    <header className={clsx(className, 'bg-base-200 h-full py-2 overflow-hidden')}>
      {/* logo */}
      <Link
        href={RouterPaths.Home}
        className="block w-fit mx-auto px-3 py-2 rounded-lg hover:bg-base-100"
      >
        <Logo />
      </Link>

      <div className="h-full flex flex-col">
        {/* menu */}
        <ul className="menu bg-base-200 rounded-lg w-full max-w-xs flex-1 max-h-[calc(100vh-115px)]">
          {menus.map((item) => {
            return (
              <li key={item.name}>
                <Link href={item.path} className="cursor-pointer">
                  <RenderIcon name={item.icon} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* logout */}
        <div className="px-2 w-full">
          <Button className="w-full" text="Logout" leftIcon="logout" styles="outline" />
        </div>
      </div>
    </header>
  );
}

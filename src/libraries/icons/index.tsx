import { CSSProperties, FC } from 'react';
import Home from './home';
import Chart from './chart';
import CloseCircle from './close-circle';
import EditContent from './edit-content';
import Edit from './edit';
import Export from './export';
import Eye from './eye';
import EyeSlash from './eype-slash';
import Logout from './logout';
import Setting from './setting';
import Sms from './sms';
import Trash from './trash';
import Users from './users';
import Loading from './loading';

export type IconProps = {
  className?: string;
  style?: CSSProperties;
  transform?: string;
  id?: string;
};

export type Icon = FC<IconProps>;

const IconsDefine = {
  home: 'home',
  chart: 'chart',
  'close-circle': 'close-circle',
  'edit-content': 'edit-content',
  edit: 'edit',
  export: 'export',
  eye: 'eye',
  'eye-slash': 'eye-slash',
  logout: 'logout',
  setting: 'setting',
  sms: 'sms',
  trash: 'trash',
  users: 'users',
  loading: 'loading'
} as const;

export type IconName = keyof typeof IconsDefine;

export type IconsType = Record<IconName, Icon>;

export const Icons: IconsType = {
  home: (props: IconProps) => {
    return <Home {...props} />;
  },
  chart: (props: IconProps) => {
    return <Chart {...props} />;
  },
  'close-circle': (props: IconProps) => {
    return <CloseCircle {...props} />;
  },
  'edit-content': (props: IconProps) => {
    return <EditContent {...props} />;
  },
  edit: (props: IconProps) => {
    return <Edit {...props} />;
  },
  export: (props: IconProps) => {
    return <Export {...props} />;
  },
  eye: (props: IconProps) => {
    return <Eye {...props} />;
  },
  'eye-slash': (props: IconProps) => {
    return <EyeSlash {...props} />;
  },
  logout: (props: IconProps) => {
    return <Logout {...props} />;
  },
  setting: (props: IconProps) => {
    return <Setting {...props} />;
  },
  sms: (props: IconProps) => {
    return <Sms {...props} />;
  },
  trash: (props: IconProps) => {
    return <Trash {...props} />;
  },
  users: (props: IconProps) => {
    return <Users {...props} />;
  },
  loading: (props: IconProps) => {
    return <Loading {...props} />;
  }
};

export const RenderIcon = ({ name, id, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const Icon = Icons[name];
  return <Icon {...reset} id={id || name} data-testid={`${name}-icon`} />;
};

export const IconsList = Object.keys(IconsDefine) as IconName[];

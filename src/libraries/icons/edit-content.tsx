import clsx from 'clsx';
import { IconProps } from '.';

export default function EditContent({ className, transform, ...reset }: Readonly<IconProps>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('h-6 w-6', className)}
      transform={transform}
      {...reset}
    >
      <path
        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
        fill="currentColor"
      />
      <path
        d="M8.49935 17.6901C7.88935 17.6901 7.32935 17.4701 6.91935 17.0701C6.42935 16.5801 6.21935 15.8701 6.32935 15.1201L6.75935 12.1101C6.83935 11.5301 7.21935 10.7801 7.62935 10.3701L15.5093 2.49006C17.4993 0.500059 19.5193 0.500059 21.5093 2.49006C22.5993 3.58006 23.0893 4.69006 22.9893 5.80006C22.8993 6.70006 22.4193 7.58006 21.5093 8.48006L13.6293 16.3601C13.2193 16.7701 12.4693 17.1501 11.8893 17.2301L8.87935 17.6601C8.74935 17.6901 8.61935 17.6901 8.49935 17.6901ZM16.5693 3.55006L8.68935 11.4301C8.49935 11.6201 8.27935 12.0601 8.23935 12.3201L7.80935 15.3301C7.76935 15.6201 7.82935 15.8601 7.97935 16.0101C8.12935 16.1601 8.36935 16.2201 8.65935 16.1801L11.6693 15.7501C11.9293 15.7101 12.3793 15.4901 12.5593 15.3001L20.4393 7.42006C21.0893 6.77006 21.4293 6.19006 21.4793 5.65006C21.5393 5.00006 21.1993 4.31006 20.4393 3.54006C18.8393 1.94006 17.7393 2.39006 16.5693 3.55006Z"
        fill="currentColor"
      />
      <path
        d="M19.8496 9.82978C19.7796 9.82978 19.7096 9.81978 19.6496 9.79978C17.0196 9.05978 14.9296 6.96978 14.1896 4.33978C14.0796 3.93978 14.3096 3.52978 14.7096 3.40978C15.1096 3.29978 15.5196 3.52978 15.6296 3.92978C16.2296 6.05978 17.9196 7.74978 20.0496 8.34978C20.4496 8.45978 20.6796 8.87978 20.5696 9.27978C20.4796 9.61978 20.1796 9.82978 19.8496 9.82978Z"
        fill="currentColor"
      />
    </svg>
  );
}

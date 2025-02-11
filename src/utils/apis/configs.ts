import { ConfigItem } from '@/types/configs';
import { supabase } from '../supabase';

const TableName = {
  Configs: 'configs'
};
export const apiGetConfigs = async () => {
  const res = await supabase.from(TableName.Configs).select('*');
  const modifyRes: ConfigItem[] = res.data ?? [];
  if (res.status === 200) return { data: modifyRes };
  return { data: [] };
};

// export const apiAddNewMessage = async (body: any) => {
//   const res = await supabase
//     .from(TableName.Configs)
//     .insert([
//       {
//         created_at: new Date(),
//         content: body.content,
//         author: body.author,
//         guests: body.guests,
//         is_attend: body.isAttend
//       }
//     ])
//     .select('*');
//   let data: MessageItem | null = null;
//   if (res.error === null && res.data.length > 0) {
//     const modifyRes: MessageItem[] = (res.data ?? []).map((item) => ({
//       author: item?.author,
//       content: item?.content,
//       createdAt: item?.created_at,
//       isAttend: item?.isAttend,
//       guests: item?.guests
//     }));
//     data = modifyRes[0];
//   }
//   return data;
// };

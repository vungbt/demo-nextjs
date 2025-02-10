

import { apiGetConfigs } from "@/utils/apis/configs";

export default async function Home() {
  const res = await apiGetConfigs()
  console.log("res===>", res)
  return (
   <>
    <button className="btn btn-sm">234234</button>
   </>
  );
}

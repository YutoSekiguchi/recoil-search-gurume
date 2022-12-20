import type { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "../../../libraries/fetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (typeof process.env.API_URL_ROOT === 'undefined') return;

  const data = await fetcher(process.env.API_URL_ROOT)
  res.end(JSON.stringify(data));
}

export default handler
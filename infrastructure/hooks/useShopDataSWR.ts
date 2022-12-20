import useSWR, { SWRResponse } from 'swr';
import { fetcher } from '../../libraries/fetcher';

export const useShopDataSWR = (
  userSetKeyword: string,
  fallbackData: HotpepperResponseType
): SWRResponse<HotpepperResponseType, any> => {
  return useSWR(`api/gourmet/${userSetKeyword}`, fetcher, { fallbackData, refreshInterval: 30000 })
}
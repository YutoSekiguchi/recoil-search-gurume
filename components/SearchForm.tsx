import React, { useRef } from "react";

import { useShopDataSWR } from "../infrastructure/hooks/useShopDataSWR";
import { useUserInputKeywordMutator } from "../infrastructure/recoil/useUserInputKeywordState";
import { fetcher } from "../libraries/fetcher";

interface SearchFormProps {
  userSetKeyword: string
  fallbackData: HotpepperResponseType
}

/**
 * @description 検索フォームコンポーネント
 * useSWR で制御しているデータを更新する。
 */
export const SearchForm: React.FC<SearchFormProps> = ({ userSetKeyword, fallbackData }) => {
  const { setSearchKeyword } = useUserInputKeywordMutator();

  const { mutate } = useShopDataSWR(userSetKeyword, fallbackData);

  const formRef: React.RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);

  const handlerOnSubmitSearch = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      searchWord: { value: string }
    }

    // ユーザが入力したキーワード
    const searchWordValue: string = target.searchWord.value;
    
    // recoilのsetState
    setSearchKeyword(searchWordValue);

    const mutationData = await fetcher(`api/gourmet/${searchWordValue}`);
    mutate(mutationData).catch((e) => {
      throw e;
    });
  }

  return (
    <>
      <form ref={formRef} onSubmit={handlerOnSubmitSearch}>
        <input type="search" name="searchWord" placeholder="Enter keyword …" />
        <button>click</button>
      </form>
    </>
  )
}
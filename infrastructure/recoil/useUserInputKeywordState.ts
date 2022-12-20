import React, { useCallback } from "react";
import { atom, SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";


/** 
@description
ユーザが入力したキーワードを定義するAtom
**/

export const userInputKeywordState = atom<string>({
  key: 'UserInputKeyword',
  default: ''
});

/** 
@description
ユーザが入力したキーワード
**/
export const useUserInputKeywordState = (): string => {
  return useRecoilValue(userInputKeywordState);
}

interface UseUserInputKeywordMutatorType {
  setSearchKeyword: (x: string) => void
}

/** 
@description
ユーザが入力したキーワードをセットする関数
**/
export const useUserInputKeywordMutator = (): UseUserInputKeywordMutatorType => {
  const setState: SetterOrUpdater<string> = useSetRecoilState(userInputKeywordState)
  const setSearchKeyword = useCallback(
    (x: string) => {
      setState(x)
    },
    [setState]
  )

  return { setSearchKeyword }
}
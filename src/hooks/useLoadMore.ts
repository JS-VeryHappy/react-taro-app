import React, { useReducer } from 'react';
import LoadMoreCustom from '@/components/LoadMoreCustom';

const initialState = {
  page: 1,
  isLoading: false,
  isEnd: false,
};

const reducer = (oldState: any, action: any) => {
  let state = JSON.parse(JSON.stringify(oldState));
  switch (action.type) {
    case 'page': {
      state.page++;
      return state;
    }
    case 'isLoading': {
      state.isLoading = action.data;
      return state;
    }
    case 'reset': {
      state = initialState;
      return state;
    }
    case 'isEnd': {
      state.isEnd = action.data;
      return state;
    }
    default:
      return state;
  }
};

function useLoadMore() {
  const [optionState, optionDispatch] = useReducer(reducer, initialState);

  const LoadMoreNode = LoadMoreCustom;

  const loadHandle = (data: any) => {
    optionDispatch({ type: 'page' });
    if (!data.last_page || data.last_page <= optionState.page) {
      optionDispatch({ type: 'isEnd', data: true });
    }
  };

  const showLoading = () => {
    optionDispatch({ type: 'isLoading', data: true });
  };

  const hideLoading = () => {
    optionDispatch({ type: 'isLoading', data: false });
  };

  /**
   * 是否可以继续执行请求
   */
  const isCheckLoading = () => {
    if (optionState.isLoading || optionState.isEnd) {
      return false;
    }
    return true;
  };

  return [
    optionState,
    LoadMoreNode,
    showLoading,
    hideLoading,
    isCheckLoading,
    loadHandle,
    optionDispatch,
  ];
}

export default useLoadMore;

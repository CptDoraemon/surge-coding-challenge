import {useCallback, useState} from "react";
import useRequestState from "./use-request-state";
import axios from 'axios';

const useGet = <DataType,>(url: string) => {
  const {
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    data,
    setData,
    isError,
    resetError,
    setGenericErrorMessage
  } = useRequestState<DataType>();

  const doGet = useCallback(async () => {
    try {
      if (isLoading) {
        return
      }

      setIsLoading(true);
      resetError();
      const data = await axios.get<DataType>(url);
      setData(data.data);

    } catch (e) {
      const errorMessage = e.data.message;
      if (errorMessage) {
        setErrorMessage(e.data.message)
      } else {
        setGenericErrorMessage()
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, setIsLoading, resetError, setData, setErrorMessage, setGenericErrorMessage, url]);

  return {
    isLoading,
    data,
    isError,
    errorMessage,
    doGet
  }
};

export default useGet

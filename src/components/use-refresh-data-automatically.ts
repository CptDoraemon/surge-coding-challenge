import {useEffect, useRef, useState} from "react";

const useRefreshDataAutomatically = (data: null | any, getData: () => void, timerMs: number) => {
  const [countDown, setCountDown] = useState<null | number>(null);
  const previousCountDownRef = useRef(countDown);

  const timerRef = useRef<null | number>(null);
  const previousDataRef = useRef(data);
  useEffect(() => {
    if (previousDataRef.current === data) {
      return
    }

    previousDataRef.current = data;
    setCountDown(Math.round(timerMs / 1000));
  }, [data, timerMs]);

  useEffect(() => {
    if (previousCountDownRef.current === countDown) {
      previousCountDownRef.current = countDown;
      return
    }
    previousCountDownRef.current = countDown;

    if (countDown === null) {
      return
    }

    if (countDown > 0) {
      timerRef.current = window.setTimeout(() => {
        setCountDown(countDown - 1)
      }, 1000)
    } else {
      setCountDown(null);
      getData();
    }
  }, [getData, countDown]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    }
  }, []);

  return countDown === null ?
    null :
    Math.round((countDown * 1000 / timerMs) * 100)
};

export default useRefreshDataAutomatically

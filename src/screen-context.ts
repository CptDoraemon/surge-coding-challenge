import React, {useCallback, useEffect, useRef, useState} from "react";

interface ScreenDimension {
  width: number,
  height: number,
  mainContainerWidth: number
}

const ScreenContext = React.createContext<null | ScreenDimension>(null);

const useGetScreenDimension = () => {
  const [screen, setScreen] = useState<null | ScreenDimension>(null);
  const timerRef = useRef<null | number>(null);

  const updateScreen = useCallback(() => {
    const width = window.innerWidth;
    setScreen({
      width,
      height: window.innerHeight,
      mainContainerWidth: Math.min(1000, width)
    })
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const debouncedUpdateScreen = useCallback(() => {
    resetTimer();
    timerRef.current = window.setTimeout(updateScreen, 500)
  }, [resetTimer, updateScreen]);

  useEffect(() => {
    updateScreen()
  }, [updateScreen]);

  useEffect(() => {
    window.addEventListener('resize', debouncedUpdateScreen);
    return () => {
      window.removeEventListener('resize', debouncedUpdateScreen);
    }
  }, [debouncedUpdateScreen]);

  return screen
};

export {ScreenContext, useGetScreenDimension}

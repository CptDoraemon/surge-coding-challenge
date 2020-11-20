import {useEffect, useRef} from "react";

const useMounted = (callback: () => void) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      return
    }

    isMountedRef.current = true;
    callback()
  })
};

export default useMounted

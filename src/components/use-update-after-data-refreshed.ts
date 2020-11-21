import React, {SetStateAction, useEffect, useRef, useState} from "react";

const useUpdateAfterDataRefreshed = (fetchedData: null | any, setFrontData: React.Dispatch<SetStateAction<any>>, setBackData: React.Dispatch<SetStateAction<any>>) => {
  const [isFront, setIsFront] = useState(false);
  const previousDataRef = useRef(fetchedData);

  useEffect(() => {
    if (previousDataRef.current === fetchedData) {
      previousDataRef.current = fetchedData;
      return
    }

    previousDataRef.current = fetchedData;
    if (fetchedData !== null) {
      if (isFront) {
        setBackData(fetchedData)
      } else {
        setFrontData(fetchedData)
      }
      setIsFront(prevState => !prevState);
    }
  });

  return isFront
};

export default useUpdateAfterDataRefreshed

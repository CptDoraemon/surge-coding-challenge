import React from "react";
import useMounted from "../helpers/use-mounted";
import useGetTop10ByMarketCap, {Currency} from "../services/use-get-top-10-by-market-cap";

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
  const {
    isLoading,
    data,
    isError,
    errorMessage,
    doGet
  } = useGetTop10ByMarketCap(Currency.USD);

  useMounted(() => {
    doGet()
  });

  console.log(data);

  return (
    <div>

    </div>
  )
};

export default Main

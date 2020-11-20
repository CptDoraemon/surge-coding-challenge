import useGet from "./use-get";

interface Top10ByMarketCapResponse {
  Data: Item[]
}

interface Item {
  Name: string,
  FullName: string
}

export enum Currency {
  USD='USD',
  CAD='CAD',
  EUR='EUR'
}

const useGetTop10ByMarketCap = (currency: Currency) => {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${currency}`;

  const {
    isLoading,
    data,
    isError,
    errorMessage,
    doGet
  } = useGet<Top10ByMarketCapResponse>(url);

  return {
    isLoading,
    data,
    isError,
    errorMessage,
    doGet
  }
};

export default useGetTop10ByMarketCap

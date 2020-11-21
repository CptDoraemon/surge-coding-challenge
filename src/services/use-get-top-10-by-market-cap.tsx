import useRequestState from "./use-request-state";
import axios from "axios";

interface Top10ByMarketCapResponse {
  Data: Item[]
}

interface Item {
  CoinInfo: {
    Name: string,
  },
  DISPLAY: {
    [key in Currency]: {
      TOSYMBOL: string
    }
  },
  RAW: {
    [key in Currency]: {
      PRICE: number
    }
  }
}

export enum Currency {
  USD='USD',
  CAD='CAD',
  EUR='EUR'
}

const LETTER_LENGTH = 15;

const useGetTop10ByMarketCap = (currency: Currency) => {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${currency}`;

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
  } = useRequestState<string[]>();

  const doGet = async () => {
    try {
      setIsLoading(true);
      resetError();
      const data = await axios.get<Top10ByMarketCapResponse>(url);
      const rawData = data.data;

      // converting raw data to an array of string, string starts with coin name, end with coin price
      const names = rawData.Data.map(item => item.CoinInfo.Name);
      const currencySymbols = rawData.Data.map(item => item.DISPLAY[currency].TOSYMBOL);
      const prices = rawData.Data.map(item => item.RAW[currency].PRICE.toFixed(2));
      const textArray = names.map((name, i) => {
        // fill the text to 15 characters in the middle with space
        const short = Math.max(LETTER_LENGTH - name.length - prices[i].length - currencySymbols[i].length, 0);
        return `${name}${new Array(short).fill(' ').join('')}${currencySymbols[i]}${prices[i]}`
      });
      setData(textArray);
    } catch (e) {
      const hasErrorMessage = e.data && e.data.message;
      if (hasErrorMessage) {
        setErrorMessage(e.data.message)
      } else {
        setGenericErrorMessage()
      }
    } finally {
      setIsLoading(false)
    }
  };

  return {
    isLoading,
    data,
    isError,
    errorMessage,
    doGet
  }
};

export default useGetTop10ByMarketCap

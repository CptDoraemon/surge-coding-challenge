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

export const LETTER_LENGTH = 16;

const useGetTop10ByMarketCap = (currency: Currency) => {
  // I know it's bad practise to hard coding api_key, but there is no way to hide secret in frontend anyways
  // Usually I'll let node server to proxy the API calls
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${currency}&api_key=4d646ccdea5094e1300c8846841310f384150830ecfa7ad715085f6da4320bab`;

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
      const data = await axios.request<Top10ByMarketCapResponse>({
        url: `${url}&a=${Date.now().toString(36)}`,
        method: 'get'
      });
      const rawData = data.data;

      // converting raw data to an array of string, string starts with coin name, end with coin price
      const names = rawData.Data.map(item => item.CoinInfo.Name);
      const currencySymbols = rawData.Data.map(item => item.DISPLAY[currency].TOSYMBOL);
      const prices = rawData.Data.map(item => item.RAW[currency].PRICE.toFixed(2));
      const textArray = names.map((name, i) => {
        // fill the text so that it's at least LETTER_LENGTH long
        // In case the raw text is longer than LETTER_LENGTH, pad it with one extra white space
        const letterLength = Math.max(LETTER_LENGTH, name.length + prices[i].length + currencySymbols[i].length + 1);
        const short = Math.max(letterLength - name.length - prices[i].length - currencySymbols[i].length, 0);
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

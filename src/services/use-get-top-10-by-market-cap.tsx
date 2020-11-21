import useGet from "./use-get";
import {useMemo} from "react";

interface Top10ByMarketCapResponse {
  Data: Item[]
}

interface Item {
  CoinInfo?: {
    Name?: string,
  },
  DISPLAY?: {
    [key in Currency]?: {
      TOSYMBOL?: string
    }
  },
  RAW?: {
    [key in Currency]?: {
      PRICE?: number
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
    data: _data,
    isError,
    errorMessage,
    doGet
  } = useGet<Top10ByMarketCapResponse>(url);

  console.log(_data);

  // data is an array of string, string starts with coin name, end with coin price
  const data: null | string[] = useMemo(() => {
    if (_data === null) {
      return null
    } else {
      const names = _data.Data.map(item => item?.CoinInfo?.Name === undefined ? 'unknown' : item?.CoinInfo?.Name);
      const currencySymbols = _data.Data.map(item => item?.DISPLAY?.USD?.TOSYMBOL === undefined ? '' : item?.DISPLAY?.USD?.TOSYMBOL);
      const prices = _data.Data.map(item => item?.RAW?.USD?.PRICE === undefined ? '0' : item?.RAW?.USD?.PRICE.toFixed(2));

      return names.map((name, i) => {
        // fill the text to 15 characters in the middle with space
        const short = Math.max(LETTER_LENGTH - name.length - prices[i].length - currencySymbols[i].length, 0);
        console.log(short);
        return `${name}${new Array(short).fill(' ').join('')}${currencySymbols[i]}${prices[i]}`
      })
    }
  }, [_data]);

  return {
    isLoading,
    data,
    isError,
    errorMessage,
    doGet
  }
};

export default useGetTop10ByMarketCap

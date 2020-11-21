import React, {SetStateAction, useMemo, useState} from "react";
import useMounted from "../helpers/use-mounted";
import useGetTop10ByMarketCap, {Currency} from "../services/use-get-top-10-by-market-cap";
import FlipRow from "../components/flip-row";
import {makeStyles} from "@material-ui/core/styles";
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CurrencySelector from "./currency-selector";
import useRefreshDataAutomatically from "./use-refresh-data-automatically";
import mockLoadingData from "./mock-loading-data";
import useUpdateAfterDataRefreshed from "./use-update-after-data-refreshed";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    color: theme.palette.secondary.contrastText,
    position: 'fixed',
    bottom: 50,
    right: 50,
    zIndex: theme.zIndex.snackbar
  },
  message: {
    width: '100%',
    margin: theme.spacing(2, 0)
  }
}));

interface PriceBoardProps {
  currency: Currency,
  setCurrency: React.Dispatch<SetStateAction<Currency>>,
  isInfoShowed: boolean,
  setIsInfoShowed: React.Dispatch<SetStateAction<boolean>>,
}

const PriceBoard: React.FC<PriceBoardProps> = ({currency, setCurrency, isInfoShowed, setIsInfoShowed}) => {
  const classes = useStyles();
  const {
    isLoading,
    data: fetchedData,
    isError,
    errorMessage,
    doGet
  } = useGetTop10ByMarketCap(currency);

  const [frontData, setFrontData] = useState(mockLoadingData.slice());
  const [backData, setBackData] = useState(mockLoadingData.slice());

  useMounted(() => {
    doGet()
  });

  const isFront = useUpdateAfterDataRefreshed(fetchedData, setFrontData, setBackData);
  const refreshingProgress = useRefreshDataAutomatically(fetchedData, doGet, 30000);

  const content = useMemo(() => {
    return (
      <div>
        {frontData.map((text, index) => {
          return <FlipRow frontText={text} backText={backData[index]} isFront={isFront} key={index} row={index}/>
        })}
      </div>
    )
  }, [backData, frontData, isFront]);

  return (
    <div className={classes.root}>

      {
        isLoading && <CircularProgress size={25} className={classes.spinner}/>
      }

      {
        refreshingProgress !== null && <CircularProgress size={25} variant="static" className={classes.spinner} value={refreshingProgress}/>
      }

      {
        isError &&
        <Alert
            severity="error"
            className={classes.message}
        >{errorMessage}</Alert>
      }

      {
        isInfoShowed &&
        <Alert
            severity="info"
            className={classes.message}
            onClose={() => setIsInfoShowed(false)}
        >Coin price changes quickly, data is refreshed automatically every 30 seconds</Alert>
      }

      {
        <CurrencySelector currency={currency} setCurrency={setCurrency}/>
      }

      { content }
    </div>
  )
};

export default PriceBoard

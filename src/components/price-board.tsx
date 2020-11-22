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
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  infoRow: {
    width: '100%',
    position: 'relative',
  },
  spinnerContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    zIndex: theme.zIndex.snackbar,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    color: theme.palette.secondary.contrastText,
  },
  message: {
    width: '100%',
    margin: theme.spacing(0.5, 0)
  },
  link: {
    color: theme.palette.secondary.contrastText,
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
    textAlign: 'right'
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
  const isFront = useUpdateAfterDataRefreshed(fetchedData, setFrontData, setBackData);
  const refreshingProgress = useRefreshDataAutomatically(fetchedData, doGet, 30000);

  useMounted(() => {
    doGet()
  });

  return (
    <div className={classes.root}>

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
        >Coin prices change quickly, data is refreshed automatically every 30 seconds</Alert>
      }

      <div className={classes.infoRow}>
        <div className={classes.spinnerContainer}>
          {
            isLoading && <CircularProgress size={25} className={classes.spinner}/>
          }
          {
            refreshingProgress !== null && <CircularProgress size={25} variant="static" className={classes.spinner} value={refreshingProgress} />
          }
        </div>
        <CurrencySelector currency={currency} setCurrency={setCurrency}/>
      </div>

      {
        // content
        frontData.map((text, index) => {
          return <FlipRow frontText={text} backText={backData[index]} isFront={isFront} key={index} row={index}/>
        })
      }

      <Link href="https://min-api.cryptocompare.com/" target="_blank" rel="noopener" className={classes.link}>
        API 💪 By CryptoCompare
      </Link>
    </div>
  )
};

export default PriceBoard

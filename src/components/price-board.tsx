import React, {useEffect, useMemo, useState} from "react";
import useMounted from "../helpers/use-mounted";
import useGetTop10ByMarketCap, {Currency} from "../services/use-get-top-10-by-market-cap";
import FlipRow from "../components/flip-row";
import {makeStyles} from "@material-ui/core/styles";
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const LOADING = 'loading...     ';
const loadingArray = (() => {
  const array = [];
  for (let i=0; i<10; i++) {
    array.push(LOADING)
  }
  return array;
})();

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

}

const PriceBoard: React.FC<PriceBoardProps> = () => {
  const classes = useStyles();
  const [isInfoShowed, setIsInfoShowed] = useState(true);
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

  const [isFront, setIsFront] = useState(false);
  useEffect(() => {
    if (data !== null) {
      setTimeout(() => {
        setIsFront(true)
      })
    }
  }, [data]);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div>
          {loadingArray.map((text, index) => {
            return <FlipRow frontText={text} backText={text} isFront={false} key={index} row={index}/>
          })}
        </div>
      )
    } else if (!isLoading && data !== null) {
      // loaded and has data
      return (
        <div>
          {data.map((text, index) => {
            return <FlipRow frontText={LOADING} backText={text} isFront={isFront} key={index} row={index}/>
          })}
        </div>
      )
    } else return <></>
  }, [data, isFront, isLoading]);

  return (
    <div className={classes.root}>

      {
        isLoading && <CircularProgress size={25} className={classes.spinner}/>
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

      { content }
    </div>
  )
};

export default PriceBoard

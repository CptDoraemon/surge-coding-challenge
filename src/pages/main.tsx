import React, {useState} from "react";
import PriceBoard from "../components/price-board";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {Currency} from "../services/use-get-top-10-by-market-cap";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontFamily: `"Archivo Black", sans-serif`,
    color: theme.palette.secondary.contrastText,
    textTransform: 'capitalize',
    textAlign: 'center',
    margin: theme.spacing(0, 0, 1, 0)
  }
}));

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
  const classes = useStyles();
  const [currency, setCurrency] = useState(Currency.USD);
  const [isInfoShowed, setIsInfoShowed] = useState(true);

  return (
    <div className={classes.root}>
      <Typography component={'h2'} variant={'h6'} className={classes.title}>
        top 10 coins by market cap
      </Typography>
      <PriceBoard currency={currency} setCurrency={setCurrency} key={currency} isInfoShowed={isInfoShowed} setIsInfoShowed={setIsInfoShowed}/>
    </div>
  )
};

export default Main

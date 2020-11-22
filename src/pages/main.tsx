import React, {useContext, useState} from "react";
import PriceBoard from "../components/price-board";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {Currency} from "../services/use-get-top-10-by-market-cap";
import {ScreenContext} from "../screen-context";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  widthWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: `"Archivo Black", sans-serif`,
    color: theme.palette.secondary.contrastText,
    textTransform: 'capitalize',
    textAlign: 'center',
    margin: theme.spacing(0, 0, 3, 0)
  }
}));

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
  const classes = useStyles();
  const [currency, setCurrency] = useState(Currency.USD);
  const [isInfoShowed, setIsInfoShowed] = useState(true);
  const screen = useContext(ScreenContext);

  return (
    <div className={classes.root}>
      <div className={classes.widthWrapper} style={{width: screen?.mainContainerWidth}}>
        <Typography component={'h2'} variant={'h6'} className={classes.title}>
          top 10 coins by market cap
        </Typography>
        <PriceBoard currency={currency} setCurrency={setCurrency} key={currency} isInfoShowed={isInfoShowed} setIsInfoShowed={setIsInfoShowed}/>
      </div>
    </div>
  )
};

export default Main

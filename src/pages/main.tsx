import React, {useContext, useEffect, useState} from "react";
import PriceBoard from "../components/price-board";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {ScreenContext} from "../screen-context";

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

  return (
    <div className={classes.root}>
      <Typography component={'h2'} variant={'h6'} className={classes.title}>
        top 10 coins by market cap
      </Typography>
      <PriceBoard/>
    </div>
  )
};

export default Main

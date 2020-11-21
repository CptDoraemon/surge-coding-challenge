import React, {SetStateAction, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {Currency} from "../services/use-get-top-10-by-market-cap";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    color: theme.palette.primary.contrastText,
    fontWeight: 700,
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    },
    '&:first-child': {
      margin: theme.spacing(1, 1, 1, 0),
    }
  },
  unselectedButton: {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.primary.main}`
  },
  selectedButton: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`
  }
}));

const options = Object.keys(Currency) as Currency[];

interface CurrencySelectorProps {
  currency: Currency,
  setCurrency: React.Dispatch<SetStateAction<Currency>>
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({currency, setCurrency}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        options.map(option =>
          <Button
            key={option}
            className={clsx(
              classes.button,
              currency === option && classes.selectedButton,
              currency !== option && classes.unselectedButton
            )}
            onClick={() => setCurrency(option)}
          >{option}</Button>
        )
      }
    </div>
  )
};

export default CurrencySelector

import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import theme from "../theme";

const commonStyles = createStyles({
  dimension: {
    width: 50,
    height: 50
  },
  centering: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyles: {
    fontFamily: `"Archivo Black", sans-serif`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '1.5rem',
    fontWeight: 400,
    textTransform: 'uppercase'
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    perspective: '1000px',
    margin: 1
  },
  wrapper: {
    position: 'relative',
    transformStyle: 'preserve-3d',
    ...commonStyles.dimension,
  },
  active: {
    transform: 'rotateX(180deg)'
  },
  front: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    ...commonStyles.dimension,
    ...commonStyles.centering,
    ...commonStyles.textStyles
  },
  back: {
    transform: 'rotateX(180deg)',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    ...commonStyles.dimension,
    ...commonStyles.centering,
    ...commonStyles.textStyles
  }
}));

interface FlipLetterProps {
  front: string,
  back: string,
  isFront: boolean,
  column: number,
  row: number
}

const FlipLetter: React.FC<FlipLetterProps> = ({front, back, isFront, row, column}) => {
  const classes= useStyles();

  return (
    <div className={classes.root}>
      <div
        className={clsx(classes.wrapper, !isFront && classes.active)}
        style={{
          transition: `transform 1000ms ${row*500 + column*100}ms`,
        }}
      >
        <div className={classes.front}>
          <span>{front}</span>
        </div>
        <div className={classes.back}>
          <span>{back}</span>
        </div>
      </div>
    </div>
  )
};

export default FlipLetter

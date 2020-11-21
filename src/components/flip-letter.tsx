import React from "react";
import {createStyles, makeStyles, useTheme} from "@material-ui/core/styles";
import clsx from 'clsx';
import theme from "../theme";

const commonStyles = createStyles({
  dimension: {
    width: '100%',
    height: '100%'
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
    fontWeight: 400,
    textTransform: 'uppercase'
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    perspective: '1000px',
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
  row: number,
  size: number
}

const FlipLetter: React.FC<FlipLetterProps> = ({front, back, isFront, row, column, size}) => {
  const classes= useStyles();
  const marginX = 1;
  const contentBox = size - 2 * marginX;
  const fontSize = contentBox * 0.5;

  return (
    <div className={classes.root}
         style={{
           width: contentBox,
           height: contentBox,
           margin: `${contentBox * 0.15}px ${marginX}px`
         }}>
      <div
        className={clsx(classes.wrapper, !isFront && classes.active)}
        style={{
          transition: `transform 1000ms ${row*500 + column*100}ms`,
        }}
      >
        <div className={classes.front} style={{fontSize}}>
          <span>{front}</span>
        </div>
        <div className={classes.back} style={{fontSize}}>
          <span>{back}</span>
        </div>
      </div>
    </div>
  )
};

export default FlipLetter

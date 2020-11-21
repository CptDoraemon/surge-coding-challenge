import React, {useMemo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FlipLetter from "./flip-letter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2, 0)
  }
}));

const fillUpArrayToLength = (array: any[], length: number) => {
  const result = array.slice();
  if (array.length < length) {
    const short = length - array.length;
    for (let i=0; i<short; i++) {
      result.push(' ')
    }
  }

  return result
};

interface FlipRowProps {
  frontText: string,
  backText: string,
  isFront: boolean,
  row: number
}

const FlipRow: React.FC<FlipRowProps> = ({frontText, backText, isFront, row}) => {
  const classes= useStyles();

  const letterLength = useMemo(() => {
    return Math.max(frontText.length, backText.length)
  }, [frontText, backText]);

  const frontTextArray = useMemo(() => {
    return fillUpArrayToLength(frontText.split(''), letterLength)
  }, [frontText, letterLength]);

  const backTextArray = useMemo(() => {
    return fillUpArrayToLength(backText.split(''), letterLength)
  }, [backText, letterLength]);

  return (
    <div className={classes.root}>
      {
        frontTextArray.map((letter, i) => (
          <FlipLetter front={letter} back={backTextArray[i]} isFront={isFront} key={i} column={i} row={row}/>
        ))
      }
    </div>
  )
};

export default FlipRow

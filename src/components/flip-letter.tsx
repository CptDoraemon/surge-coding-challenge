import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {

  }
}));

interface FlipLetterProps {
  front: string,
  back: string
}

const FlipLetter = React.FC<FlipLetterProps> = ({front, back}) => {
  const classes= useStyles();

  return (
    <div className={classes.root}>

    </div>
  )
};

export default FlipLetter

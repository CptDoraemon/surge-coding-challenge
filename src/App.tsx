import React, {useContext, useEffect} from 'react';
import {CssBaseline, useTheme} from "@material-ui/core";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import theme from "./theme";
import {ScreenContext, useGetScreenDimension} from "./screen-context";
import Main from "./pages/main";

const App: React.FC = () => {
  const screen = useGetScreenDimension();

  return (
    <ScreenContext.Provider value={screen}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <InnerApp/>
      </ThemeProvider>
    </ScreenContext.Provider>
  )
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    maxWidth: '100%',
    margin: theme.spacing(10, 0)
  },
}));

const InnerApp: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.secondary.main;
  }, [theme]);

  return (
    <div className={classes.root}>
      <Main/>
    </div>
  );
};

export default App;

import React, {useContext} from 'react';
import {CssBaseline} from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
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

const InnerApp: React.FC = () => {
  const screen = useContext(ScreenContext);

  // wait only screen dimension is retrieved.
  if (screen === null) {
    return <></>
  }

  return (
    <div>
      <Main/>
    </div>
  );
};

export default App;

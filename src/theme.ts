import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(60, 63, 65)',
      contrastText: '#eee',
    },
    secondary: {
      main: 'rgb(43, 43, 43)',
      contrastText: '#eee',
    },
    info: {
      main: 'rgb(60, 63, 65)',
      contrastText: '#eee',
    }
  },
  typography: {
    "fontFamily": "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});
theme = responsiveFontSizes(theme);

export default theme;

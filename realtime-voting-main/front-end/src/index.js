import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';
// import NavBar from './components/Navbar/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = false;

const themeDark = createTheme({
  palette: {
    mode : 'dark',
    primary: {
      main: '#fff'
    },
    secondary: {
      main : '#52cfe3'
    }
  },
  typography: {
    fontFamily: 'Noto Sans Thai, san serif'
  },
})

const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#52cfe3'
    }
  },
  typography: {
    fontFamily: 'Noto Sans Thai, san serif'
  }
})

root.render(
  <ThemeProvider theme={ !theme ? themeLight : themeDark}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

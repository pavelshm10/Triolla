import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import createEmotionCache from '@emotion/cache';
import store from './redux/store';
import rtlCache from './theme';

const defaultCache = createEmotionCache({ key: 'mui' });

const renderApp = () => {
  const currentLanguage = i18n.language;
  const isHebrew = currentLanguage === 'he';

  const theme = createTheme({
    direction: isHebrew ? 'rtl' : 'ltr',
  });

  // Listen for language changes to update the document direction
  i18n.on('languageChanged', (lng) => {
    document.body.dir = lng === 'he' ? 'rtl' : 'ltr';
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <CacheProvider value={isHebrew ? rtlCache : defaultCache}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </CacheProvider>
      </I18nextProvider>
    </Provider>
  );
};

ReactDOM.render(renderApp(), document.getElementById('root'));

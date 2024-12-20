import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import theme from './Theme/theme.ts';
import { Provider } from 'react-redux';
import store from './Redux/Store.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);

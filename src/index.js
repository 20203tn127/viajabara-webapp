import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ConfigProvider theme={{
      components: {
        Menu:{
          itemSelectedColor: '#FFF',
          itemSelectedBg: '#FB1506',
          colorItemBgSelectedHorizontal: '#FB1506',
          horizontalItemSelectedBg: '#FB1506',
        },
      }
    }}>
      <App />
    </ConfigProvider>
  </BrowserRouter>
);

serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    if (registration &&  registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING"});

      window.location.reload();
    }
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

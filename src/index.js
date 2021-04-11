import React from 'react';
import ReactDOM from 'react-dom';
import './_styles/index.css';
import App from './App';
import ApolloClientProvider from './_providers/ApolloClientProvider';
import QueryProvider from './_providers/QueryProvider';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <QueryProvider>
      <ApolloClientProvider>
        <App />
      </ApolloClientProvider>
    </QueryProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

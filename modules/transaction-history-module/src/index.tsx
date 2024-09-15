// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TransactionHistory from "./screens/TransactionHistory";

const App: React.FC = () => (
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
);

export default App;
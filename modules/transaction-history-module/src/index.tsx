// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionHistory from './screens/TransactionHistory';
import TransactionDetail from './screens/TransactionDetail';

const Stack = createNativeStackNavigator();
const App: React.FC = () => (
  <Provider store={store}>
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionHistory" 
        component={TransactionHistory}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  </Provider>
);

export default App;
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import {connect , Provider} from 'react-redux';
import {store , persistor} from './redux/Default_state/State.js'
import * as Font from 'expo-font';
import { Initial } from './App/Initial.js';
import { Entry } from './App/Entry/Entry.js';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';
// Keep the splash screen visible while we fetch resources

export default function App(props) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
   
  }, []);

  

  return (
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="dark" />
        <Entry/>
      </PersistGate>
    </Provider>
  );
}


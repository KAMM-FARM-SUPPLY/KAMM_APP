import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import {connect , Provider} from 'react-redux';
import store from './redux/Default_state/State.js'
import * as Font from 'expo-font';
import { Initial } from './App/Initial.js';
import { StatusBar } from 'expo-status-bar';

// Keep the splash screen visible while we fetch resources

export default function App(props) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
   
  }, []);

  

  return (
    <Provider store = {store}>
      <StatusBar style="dark" />
      <Initial />
      
    </Provider>
  );
}


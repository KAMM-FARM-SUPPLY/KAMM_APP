import React, { useCallback, useEffect, useState } from 'react';
import { Text, View , TouchableOpacity , StyleSheet , ScrollView , FlatList} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import {connect , Provider} from 'react-redux';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';

export default function App(props) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    
  }, []);

  

  return (
    <ScrollView style = {{flex:1 , backgroundColor : 'red'}}>
        <View>
            <Text></Text>
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({


})


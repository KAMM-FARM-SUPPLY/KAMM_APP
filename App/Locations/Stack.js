import React , {useEffect}from 'react'
import {View , Text , Pressable , StyleSheet , TouchableOpacity} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {Avatar} from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import Subcounty from '../Locations/Subcounty.js'
import District from '../Locations/District.js'
import Village from './Village.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export const Stack = ({navigation}) => {
  const Stack  =  createStackNavigator();
  useEffect(()=>{
    console.log('rendering')
  },[])
  return (
      <Stack.Navigator initialRouteName = "District" detachInactiveScreens = {true}>
      <Stack.Group 
            
        >
          <Stack.Screen name = "District" component = {District} options={{headerShown : false}}/>
          <Stack.Screen name = "Subcounty" component = {Subcounty} options={{headerShown : false}}/>
          <Stack.Screen name = "Village" component = {Village} options={{headerShown : false}}/>


        </Stack.Group>
      </Stack.Navigator>
    
  )
}



export default Stack

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: ScreenWidth,
    paddingHorizontal: 0.1 * ScreenHeight,
    paddingTop : 30,
    justifyContent: "space-between",

  },
  item : {
    height : ScreenHeight * 0.2,
    width : ScreenWidth * 0.3,
    // backgroundColor : 'red',
    borderRadius : 10,
    elevation : 5,
    flexDirection : 'column',
    justifyContent : 'space-around',
    alignItems : 'center'
    
    
  }
})
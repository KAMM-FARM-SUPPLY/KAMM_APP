import React , {useEffect}from 'react'
import {View , Text , Pressable , StyleSheet , TouchableOpacity} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {Avatar} from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import Initial from '../Initial.js'
import Login from '../Login.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export const Entry = ({navigation}) => {
  const Stack  =  createStackNavigator();
  useEffect(()=>{
  },[])
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator initialRouteName = "Login"  detachInactiveScreens = {false}>
      <Stack.Group 
        >
          <Stack.Screen name = "Login" component = {Login} options = {{headerShown : false}}/>
          <Stack.Screen name = "App" component = {Initial} options = {{headerShown : false}}/>
          
        </Stack.Group>
      </Stack.Navigator>
      </NavigationContainer>
    
  )
}



export default Entry

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
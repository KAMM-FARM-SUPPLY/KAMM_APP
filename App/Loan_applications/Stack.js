import React , {useEffect}from 'react'
import {View , Text , Pressable , StyleSheet , TouchableOpacity} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {Avatar} from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Category from './ApplicationScreens/Category'
import Products from './ApplicationScreens/Products';

import Screen_1 from './Screen_1'
import Application from './ApplicationScreens/Application'
import Collateral from './ApplicationScreens/Collateral'
import Kin from './ApplicationScreens/Kin'
import KinSignature from './ApplicationScreens/KinSignature'
import ApplicantSignature from './ApplicationScreens/ApplicantSignature'
import General from './Visits/General'
import OverScreen from './Overview/OverScreen'
import ApplicationProfile from './ApplicationProfile'

import District from '../Locations/District'
import Subcounty from '../Locations/Subcounty'
import Village from '../Locations/Village'
import FarmersList from '../FarmersRegistration/Overview/FarmersList'

export const Stack = ({navigation}) => {
  const Stack  =  createStackNavigator();
  useEffect(()=>{
  },[])
  return (
      <Stack.Navigator initialRouteName = "Overview" detachInactiveScreens = {true}>
      <Stack.Group>
            
          <Stack.Screen name = "Overview" component = {Screen_1} options={{headerShown : false}}/>
          <Stack.Screen name = "Visits LA" component = {General} options={{headerShown : false}}/>
          <Stack.Screen name = "District LA" component = {District} options={{headerShown : false}}/>
          <Stack.Screen name = "Subcounty LA" component = {Subcounty} options={{headerShown : false}}/>
          <Stack.Screen name = "Village LA" component = {Village} options={{headerShown : false}}/>
          <Stack.Screen name = "Farmers List LA" component = {FarmersList} options={{headerShown : false}}/>
          <Stack.Screen name = "GeneralOverview LA" component = {OverScreen} options={{headerShown : false}}/>
          <Stack.Screen name = "Application" component = {Application} options={{headerShown : false}}/>
          <Stack.Screen name = "Categories" component = {Category} options={{headerShown : true}}/>
          <Stack.Screen name = "Products" component = {Products} options={{headerShown : true}}/>
          <Stack.Screen name = "Collateral" component = {Collateral} options={{headerShown : true}}/>
          <Stack.Screen name = "Next of Kin" component = {Kin} options={{headerShown : true}}/>
          <Stack.Screen name = "Next of Kin Signature" component = {KinSignature} options={{headerShown : true}}/>
          <Stack.Screen name = "Applicant Signature" component = {ApplicantSignature} options={{headerShown : true}}/>
          <Stack.Screen name = "Loan Application" component = {ApplicationProfile} options={{headerShown : true}}/>


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
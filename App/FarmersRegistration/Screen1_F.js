import React , {useEffect}from 'react'
import {View , Text , Pressable , StyleSheet , TouchableOpacity} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {Avatar} from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import Overview from './Overview.js'
import Info_1 from './Registration/Info_1.js'
import Info_1_ from './Registration/Info_1_.js'
import Screen_1 from './Registration/Screen_1.js'
import Profile_pic from './Registration/Profile_pic.js';
import NIN_Photos from './Registration/NIN_Photos.js'
import Signature from './Registration/Signature.js'
import FarmerProfile from './FarmerProfile.js'
import Subcounty from '../Locations/Subcounty.js'
import District from '../Locations/District.js'
import Village from '../Locations/Village.js'
import General from './Visits/General.js'
import GeneralOverview from './Overview/GeneralOverview.js'
import FarmersList from './Overview/FarmersList.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export const Screen1_F = ({navigation}) => {
  const Stack  =  createStackNavigator();
  useEffect(()=>{
    console.log('rendering')
  },[])
  return (
      <Stack.Navigator initialRouteName = "Welcome" detachInactiveScreens = {false}>
      <Stack.Group 
        >
          <Stack.Screen name = "Welcome" component = {Overview} options = {{headerShown : false}}/>
          <Stack.Screen name = "Visits" component = {General} options = {{headerShown : false}}/>
          <Stack.Screen name = "General Overview" component = {GeneralOverview} options = {{headerShown : false}}/>
          <Stack.Screen name = "Basic Info" component = {Screen_1} options={{headerShown : true}}/>
          <Stack.Screen name = "Profile picture" component = {Profile_pic} options={{headerShown : true}}/>
          <Stack.Screen name = "National Id photos" component = {NIN_Photos} options={{headerShown : true}}/>
          <Stack.Screen name = "Signature" component = {Signature} options={{headerShown : true}}/>
          <Stack.Screen name = "District" component = {District} options={{headerShown : false}}/>
          <Stack.Screen name = "Subcounty" component = {Subcounty} options={{headerShown : false}}/>
          <Stack.Screen name = "Village" component = {Village} options={{headerShown : false}}/>
          <Stack.Screen name = "Profile" component = {FarmerProfile} options={{headerShown : false}}/>
          <Stack.Screen name = "Farmers List" component = {FarmersList} options={{headerShown : false}}/>
        </Stack.Group>
      </Stack.Navigator>
    
  )
}



export default Screen1_F

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
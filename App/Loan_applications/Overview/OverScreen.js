import React from 'react'
import {View , SafeAreaView , StyleSheet , Text } from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Verified from './OverviewLaTabs/Verified'
import Unverified from './OverviewLaTabs/Unverified'


const Tab = createMaterialTopTabNavigator()

function OverScreen(props) {
  return (
    <Tab.Navigator>
        <Tab.Screen name ="Verified" component = {Verified}/>
        <Tab.Screen name = "Unverified" component = {Unverified}/>
    </Tab.Navigator>
  )
}

export default OverScreen
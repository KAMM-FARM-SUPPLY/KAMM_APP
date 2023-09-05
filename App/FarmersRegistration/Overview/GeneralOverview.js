import React from 'react'
import {View , SafeAreaView , StyleSheet , Text } from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Verified from './OverviewTabs/Verified'
import Pending from './OverviewTabs/Pending'



const Tab = createMaterialTopTabNavigator()

function GeneralOverview(props) {
  return (
    <Tab.Navigator>
        <Tab.Screen name ="Verified" component = {Verified}/>
        <Tab.Screen name = "Pending verification" component = {Pending}/>
    </Tab.Navigator>
  )
}

export default GeneralOverview
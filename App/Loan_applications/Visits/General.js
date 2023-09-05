import React from 'react'
import {View , SafeAreaView , StyleSheet , Text } from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Completed from './Tabs/Completed'
import Scheduled from './Tabs/Scheduled'

const Tab = createMaterialTopTabNavigator()

function General(props) {
  return (
    <Tab.Navigator>
        <Tab.Screen name ="Scheduled" component = {Scheduled}/>
        <Tab.Screen name = "Completed" component = {Completed}/>
    </Tab.Navigator>
  )
}

export default General
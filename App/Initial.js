import * as React from 'react';
import { Button, View , Text , StyleSheet , Image} from 'react-native';
import { createDrawerNavigator , DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Screen1_F from './FarmersRegistration/Screen1_F';
import Screen_1 from './Loan_applications/Screen_1';
import {Stack as Loan_Stack} from './Loan_applications/Stack';
import {Avatar} from 'react-native-elements'
import District from './Locations/District';
import Stack from './Locations/Stack';
import FarmerProfile from './FarmersRegistration/FarmerProfile';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

const Drawer = createDrawerNavigator();

const CustomContent = (props) => (

<View style = {{flex : 1}}>
  <DrawerContentScrollView {...props} >


  <View style = {styles.header_top}>
    <Avatar rounded source = {require('../assets/logo.png')} size = {'large'}  />
    <Text style = {styles.heading_txt}>KAMM FARM SERVICES</Text>
  </View>

  <DrawerItemList {...props} />

  </DrawerContentScrollView>
  <View style = {styles.footer}>
    <Text style = {styles.heading_txt}>Logged in as Nessim</Text>
  </View>
</View>
  

)

export function Initial(props) {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props)=><CustomContent {...props}/>} initialRouteName="Farmers">
        <Drawer.Screen name="Farmers" component={Screen1_F} />
        <Drawer.Screen name="Manage Loans" component={Loan_Stack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Initial

const styles = StyleSheet.create({
  header_top : {
    height : 0.2 * ScreenHeight,
    justifyContent : 'space-around',
    alignItems : 'center'
  },
  heading_txt : {
    fontWeight : 'bold'
  },
  nav : {
    height : 0.97 * ScreenHeight,
    width : 0.8 * ScreenWidth,
    justifyContent : 'space-between',
    alignItems : 'center'
  },
  footer : {
    bottom : 10,
    position : 'absolute',
    Height : 0.3 * ScreenHeight,
    width : 0.75 * ScreenWidth,
    justifyContent : 'center',
    alignItems : 'center'
  }
})
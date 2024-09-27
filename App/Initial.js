import * as React from 'react';
import { Button, View , Text , StyleSheet , Image} from 'react-native';
import { createDrawerNavigator , DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Screen1_F from './FarmersRegistration/Screen1_F';
import Screen_1 from './Loan_applications/Screen_1';
import {Stack as Loan_Stack} from './Loan_applications/Stack';
import {Avatar , Badge} from 'react-native-elements'
import District from './Locations/District';
import Stack from './Locations/Stack';
import FarmerProfile from './FarmersRegistration/FarmerProfile';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import AppConstants from './Constants/AppConstants';
import { Sync } from './Helpers/Sync';
import {useDispatch, useSelector} from 'react-redux'
import Status from "./Components/AppStatus/Status";

import Icon from 'react-native-vector-icons/FontAwesome';


import Notifications from './Components/AppStatus/Notifications';


const Drawer = createDrawerNavigator();

const notificationCount = 5; // Replace with the actual count of notifications


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
  const dispatch = useDispatch()

  const onsuccess = (data) => {
    dispatch({type : 'Store_retrieved_data' , data : data})
  }
  
  const onError = () => {
    alert('An error occured with server . Please contact the admin for more clarificaton on this case')
  }
  

  React.useEffect(()=>{
    const SyncUpdate = setInterval(() => {
      if(AppConstants.connected){
        Sync.GET_SYNC(onsuccess , onError)
      }
    }, 900000);

    return () => clearInterval(SyncUpdate);
  },[]) 
  return (
    <NavigationContainer independent = {true}>
      <Drawer.Navigator drawerContent={(props)=><CustomContent {...props}/>} initialRouteName="Farmers">
        <Drawer.Screen name="Farmers" component={Screen1_F} />
        <Drawer.Screen name="Manage Loans" component={Loan_Stack} />
        <Drawer.Screen name="Application Status" component={Status} />
        <Drawer.Screen name = "Notifications" component={Notifications} options={{
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="bell" // Replace with your notification icon name
                  type="font-awesome" // Replace with the appropriate icon type
                  size={15}
                  onPress={() => {
                    // Handle notification icon press
                    console.log('Notification icon pressed');
                  }}
                  style={{ marginRight: 15 }}
                />
                {notificationCount > 0 && (
                  <Badge
                    value={notificationCount.toString()}
                    status="error"
                    containerStyle={{ position: 'absolute', top: -12, right: 3 }}
                  />
                )}
              </View>
            ),
          }}/>
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
import React , {useEffect}from 'react'
import {View , Text , Pressable , StyleSheet , TouchableOpacity} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {useDispatch, useSelector} from 'react-redux'
import {Avatar} from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'

import { useDimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


export const Overview = (props) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    //dispatch({type : 'change_color'})
    // let combined = {...redux_state['registration'] , ...redux_state['registration_pics']}
    // console.log(combined)
    //dispatch({type : 'Store_unsynced_profile' , data : 2 })

  },[])
  const redux_state = useSelector(state => state.Reducer)
  console.log(redux_state['unsynced_profile_data'])

  //console.log({...redux_state['registration_pics'] , ...redux_state['registration']})
  return (
    <View style={styles.container}>
        <TouchableOpacity style = {styles.item} onPress={()=>{
          //Instatiating the farmers holder data
            dispatch({type : 'Reg_Farmer'})
            dispatch({type : 'Farmer_info_visit' , key : 'farmer profile' , value : false})
            props.navigation.navigate('District' , {'registration' : true})
        }}>
        <Avatar size="large" icon = {{ name : 'user' , type : 'font-awesome', color : '#246EE9' , size : 40 }} rounded = {false}/>
        <Text style = {styles.panelText}>Registration</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>{
            props.navigation.navigate('General Overview')
        }} style = {styles.item}>
        <Avatar size="large" icon = {{ name : 'th' , type : 'font-awesome', color : '#246EE9'  , size : 40 }} rounded = {false}/>
        <Text style = {styles.panelText}>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>{
            props.navigation.navigate('Visits')
        }} style = {styles.item}>
        <Avatar size="large" icon = {{ name : 'leaf' , type : 'font-awesome', color : '#246EE9'  , size : 40 }} rounded = {false}/>
        <Text style = {styles.panelText}>Visits
        </Text>
        </TouchableOpacity>

    </View>
  )
}



export default Overview


//const { width: screenWidth } = useDimensions(); // Get screen width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 0.08 * ScreenHeight,
    paddingTop: 30,
    justifyContent: "space-between",
  },
  item: {
    height: ScreenHeight * 0.25,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexBasis: '48%',
    flexShrink: 1,
  },
  panelText: {
    fontSize: RFValue(13), // Use responsive font size
    fontWeight: 'bold',
  },
});
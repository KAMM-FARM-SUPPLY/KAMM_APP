import React , {useState , useEffect} from 'react'
import {View , Text , StyleSheet , TouchableOpacity , ActivityIndicator} from 'react-native'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import {Avatar} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import Separator from '../../../Components/Separator';
import {useDispatch, useSelector} from 'react-redux'
import { FarmerVisits} from '../../../Helpers/Visits';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay'
import { RFValue } from 'react-native-responsive-fontsize';



function Scheduled(props) {

  const [scheduled_visits , set_scheduled_visits] = useState(null)
  const [Registering , setRegistering] = useState(false)
  const dispatch = useDispatch();


  const Get_hrs_difference = (scheduled_date) => {
    var date1 = new Date(scheduled_date).getTime()
    var date2 = Date.now()
    var hours = Math.floor(Math.abs(date1 - date2) / 36e5);

    if (date2 > date1){
      return {'hours' : hours , 'validity' : false}
    }

    return {'hours' : hours , 'validity' : true}
  }


  useEffect(()=>{
    FarmerVisits.Get_Visits(false , 2 ,set_scheduled_visits , ()=>{alert('Something is wrong')});
  },[])

  if (scheduled_visits == null){
    return (
      <View style = {styles.Indicator}>
          <ActivityIndicator/>
          <Text>Loading Scheduled Visits...</Text>
      </View>
    )
  }

  return (
    <View style = {styles.container}>
        <Spinner
            visible={Registering}
            textContent={'Preparing profile ...'}
            textStyle={styles.spinnerTextStyle}
        />
        <View style = {styles.heading} >
            <View style = {styles.heading_header}>
              <Text style = {styles.heading_txt}>Scheduled Visits</Text>
              <Avatar rounded icon = {{ name : 'calendar' , size : 25 , color : 'red' , type: 'font-awesome' }} />
            </View>

        </View>

        <FlatList
            data = {scheduled_visits}
            ItemSeparatorComponent={()=><Separator/>}
            contentContainerStyle = {{paddingTop : 15}}
            renderItem={({item})=>(
              <TouchableOpacity disabled = {!Get_hrs_difference(item.scheduled_date).validity}  onPress = {()=>{
                // FarmerVisits.get_farmer_info(3 , (response)=>{
                //   dispatch({type : 'Farmer_info_visit' , key : 'farmer profile' , value : response})
                // })
                setRegistering(true)
                dispatch({type : 'Farmer_info_visit' , key : 'farmer profile' , value : item.Farmer_id})

                setTimeout(()=>{
                  setRegistering(false)
                  props.navigation.navigate('Basic Info' )
                },500)

              }} style = {{...styles.option , opacity : Get_hrs_difference(item.scheduled_date).validity ? (1) : (0.3) }}>
                  <View style = {styles.pic_description}> 
                    <Avatar rounded icon = {{ name : Get_hrs_difference(item.scheduled_date).validity ? ('clock-o') : ('user-times') , size : 25 , color : 'green' , type: 'font-awesome' }} />
                    <View style = {styles.name_info}>
                        <Text style = {{ fontWeight : 'bold' , fontSize : RFValue(15) }}>{item.Farmer_id.Name + " " + item.Farmer_id.Given_name}</Text>
                        <Text style = {{fontSize : RFValue(13)}}>Scheduled Date : {new Date(item.scheduled_date).toLocaleDateString()}</Text>
                    </View>
                  </View>

                  <View style = {styles.prefix}>
                      <Avatar rounded icon = {{ name : 'clock-o' , size : 20 , color : 'red' , type: 'font-awesome' }} />
                      <Text style = {{fontSize : RFValue(13)}}>{Get_hrs_difference(item.scheduled_date).hours} hrs </Text>
                  </View>
              </TouchableOpacity>
            )}
        />
    </View>
  )
}

export default Scheduled

const styles = StyleSheet.create({

  container : {
    flex : 1,
  },

  heading : {
    width : ScreenWidth,
    height : 0.15 * ScreenHeight,
    // backgroundColor : 'red',
    justifyContent : 'center',
    alignItems : 'center'
  },
  heading_header : {
      width : 0.6 * ScreenWidth ,
      height : 40,
      flexDirection : 'row',
      justifyContent : 'space-around',
      alignItems : 'center'
  },
  heading_txt : {
    fontSize : RFValue(18),
    fontWeight : 'bold',
  },
  pic_description : {
    width : 0.7 * ScreenWidth,
    height : 0.1 * ScreenHeight,
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center'
  },
  name_info : {
    width : 0.6 * ScreenWidth,
    height : 0.1 * ScreenHeight,
    justifyContent : 'space-around',
    alignItems : 'flex-start',
    // backgroundColor : 'red'
  },
  option : {
    width : ScreenWidth,
    height : 0.12 * ScreenHeight,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center'
  },
  prefix : {
    width : 0.4 *ScreenWidth,
    height : 0.1 * ScreenHeight,
    justifyContent : 'center',
    alignItems : 'center',
  },
  Indicator : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
 },
 spinnerTextStyle: {
  color: '#FFF'
},

})
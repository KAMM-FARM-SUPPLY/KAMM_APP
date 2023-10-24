import React , {useState , useEffect} from 'react'
import {View , Text , StyleSheet , TouchableOpacity} from 'react-native'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import {Avatar} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import Separator from '../../../Components/Separator';

function Completed(props) {

  const [completed_visits , set_completed_visits] = useState(['Test' , 'Test 2' , 'Test 3'])


  return (
    <View style = {styles.container}>
        <View style = {styles.heading} >
            <View style = {styles.heading_header}>
              <Text style = {styles.heading_txt}>Completed Visits</Text>
              <Avatar rounded icon = {{ name : 'calendar' , size : 25 , color : 'green' , type: 'font-awesome' }} />
            </View>

        </View>

        <FlatList
            data = {completed_visits}
            ItemSeparatorComponent={()=><Separator/>}
            contentContainerStyle = {{paddingTop : 15}}
            renderItem={({item})=>(
              <TouchableOpacity style = {styles.option}>
                  <View style = {styles.pic_description}> 
                    <Avatar rounded icon = {{ name : 'clock-o' , size : 25 , color : 'green' , type: 'font-awesome' }} />
                    <View style = {styles.name_info}>
                        <Text style = {{ fontWeight : 'bold' }}>Ntambi Nassim Sewaya</Text>
                        <Text>Scheduled Date : 21/07/2023</Text>
                    </View>
                  </View>

                  <View style = {styles.prefix}>
                      <Avatar rounded icon = {{ name : 'check' , size : 17 , color : 'green' , type: 'font-awesome' }} />
                      <Text>Completed</Text>
                  </View>
              </TouchableOpacity>
            )}
        />
    </View>
  )
}

export default Completed

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
    fontSize : 17,
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
  }

})
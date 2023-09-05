import React , {useEffect}from 'react'
import {View , Text , Pressable , StyleSheet , TouchableOpacity} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {useDispatch, useSelector} from 'react-redux'
import {Avatar} from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'

function Screen_1({navigation}) {
    useEffect(()=>{
    },[])

    const redux_state = useSelector(state => state.Reducer)
    const dispatch = useDispatch()

    
  return (
    <View style={styles.container}>
        <TouchableOpacity style = {styles.item} onPress={()=>{
          //Instatiating the farmers holder data
            navigation.navigate('District LA' , {'Loan_applications' : true})
        }}>
        <Avatar size="large" icon = {{ name : 'vcard-o' , type : 'font-awesome', color : '#246EE9' , size : 40 }} rounded = {false}/>
        <Text style = {styles.panelText}>Applications</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.item} onPress={()=>{
          //Instatiating the farmers holder data
          navigation.navigate('GeneralOverview LA')
        }}>
        <Avatar size="large" icon = {{ name : 'th' , type : 'font-awesome', color : '#246EE9' , size : 40 }} rounded = {false}/>
        <Text style = {styles.panelText}>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.item} onPress={()=>{
          //Instatiating the farmers holder data
          navigation.navigate('Visits LA')
        }}>
        <Avatar size="large" icon = {{ name : 'leaf' , type : 'font-awesome', color : '#246EE9' , size : 40 }} rounded = {false}/>
        <Text style = {styles.panelText}>Loan Visits</Text>
        </TouchableOpacity>


        
    </View>
  )
}

export default Screen_1

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: ScreenWidth,
    paddingHorizontal: 0.08 * ScreenHeight,
    paddingTop : 30,
    justifyContent: "space-between",

  },
  item : {
    height : ScreenHeight * 0.25,
    //width : ScreenWidth * 0.3,
    // backgroundColor : 'red',
    borderRadius : 10,
    elevation : 5,
    flexDirection : 'column',
    justifyContent : 'space-around',
    alignItems : 'center',
    flexBasis : '48%'

    
  },
  panelText : {
    fontSize : 13,
    fontWeight : 'bold'
  } 
})
import React , {useState , useEffect} from 'react'
import {View , Text , FlatList , ScrollView , StyleSheet , Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import {useDispatch, useSelector} from 'react-redux'
import Separator from '../Components/Separator'
import { Location } from '../Helpers/Location'
import AppConstants from '../Constants/AppConstants'

import { RFValue } from 'react-native-responsive-fontsize';


function Subcounty(props) {
    const redux_state = useSelector(state => state.Reducer)


  useEffect(()=>{
    // console.log(props.route.params['info'])
    if (AppConstants.connected){
        Location.Get_counties(setcounties , props.route.params['district_id'])
    }else {
        for(let i =0; i<redux_state['retrieved_data']['Locations'].length; i++){
            if (redux_state['retrieved_data']['Locations'][i]['id'] == props.route.params['district_id']){
                setcounties(redux_state['retrieved_data']['Locations'][i]['subcounties'])
                
            }
        }
    }
    
  },[])

  const [counties , setcounties] = useState(null)

  //const {District : District , "Sub-county" : Sub_counties} = props.route.params['info']

//   console.log(redux_state)

  const dispatch = useDispatch()

  if (counties == null){
    return (
        <View style = {styles.Indicator}>
            <ActivityIndicator/>
            <Text>Loading Subcounties...</Text>
        </View>
    )

  }else{
    if (counties.length == 0){
            <View style = {styles.Indicator}>
                <Text>No data available</Text>
            </View>
    }else{
        return (
            <View style = {styles.container}>
                <View style = {styles.button}>
                    <Button title={'SUBCOUTIES FOR ' + props.route.params['name']}/>
                    <View style = {styles.flatcontainer}>
                        <FlatList
                            ItemSeparatorComponent={()=><Separator/>}
                            contentContainerStyle = {styles.flatcontainer}
                            data = {counties}
                            horizontal = {false}
                            renderItem={(SubCounty , index)=>(
                                <TouchableOpacity onPress = {()=>{
                                    if(props.route.params['registration']){
                                        dispatch({type : 'Add_field' , key : 'Subcounty' , value : SubCounty.item.name})
                                        props.navigation.navigate("Village" , {'County_id' :SubCounty.item.id , 'name' : SubCounty.item.name , 'registration' : true })
                                    } else if (props.route.params['farmer_overview']){
                                        props.navigation.navigate("Village" , {'County_id' :SubCounty.item.id , 'name' : SubCounty.item.name , 'farmer_overview' : true })
        
                                    } else if (props.route.params['Loan_applications']){
                                        props.navigation.navigate("Village LA" , {'County_id' :SubCounty.item.id , 'name' : SubCounty.item.name , 'Loan_applications' : true})
        
                                    }else{
                                        props.navigation.navigate("Village" , {'info' :SubCounty.item })
                                    }
                                }} style = {styles.comp}>
                                <Text style = {styles.district}>{SubCounty.item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    
                </View>
            </View>
          )
    }
  }

  
}

export default Subcounty

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    container_style : {
        justifyContent : 'center',
        alignItems : 'center'
    },
    button : {
        top : 20,
        width : 0.9 * ScreenWidth
    },
    flatcontainer : {
        // flexGrow : 1,
        paddingTop : 15,
        // backgroundColor : 'red',
        
    },
    district : {
        fontSize : RFValue(16),
        fontWeight : 'bold',
    },
    comp : {
        height : 55,
        justifyContent : 'center'
    },
    Indicator : {
        flex : 1,
        justifyContent : 'center',
        backgroundColor : 'white',
        alignItems : 'center'
     }
})
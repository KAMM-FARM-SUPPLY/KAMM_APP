import React ,{useEffect , useState} from 'react'
import {View , Text , StyleSheet , Button , FlatList, TouchableOpacity , ActivityIndicator} from 'react-native'
import {Avatar} from 'react-native-elements'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import FarmerLogic from '../../../Helpers/Farmer'
import { Excel } from '../../../Helpers/Excel'
import {useDispatch, useSelector} from 'react-redux'
import AppConstants from '../../../Constants/AppConstants'


function Verified(props) {

    const [verified_users , setVerified_users] = useState(null)
    const redux_state = useSelector(state => state.Reducer)


    useEffect(()=>{
        if (AppConstants.connected){
            FarmerLogic.Get_farmers('True' , setVerified_users)
        }else{
             //Get data from redux state

             let users = []
             redux_state['retrieved_data']['farmers'].forEach(element => {
                if (element['Active'] == "True"){
                    users.push(element) 
                }
            });
            setVerified_users(users)

        }
        
    },[])

    if (verified_users != null ) {

        if (verified_users.length == 0){
            return (
                <View style = {styles.Indicator}>
                    <Text>No data available</Text>
                    {/* <Avatar rounded source = {require('../../../../assets/No_data.png')} size = {'xlarge'}  /> */}
                </View>
            )
        }

        return (
            <View style = {styles.container}>
                <View style = {styles.exportBtn}>
                    <View style = {{width : 0.7 * ScreenWidth}}>
                        <Button onPress = {async ()=>{await Excel.Export_to_excel(verified_users , 'Verified Farmers')}} title='Export to excel'/>
                    </View>
                </View>
        
                <View style = {styles.listContainer}>
                    <FlatList
                        data = {verified_users}
                        renderItem={({item})=>(
                            <TouchableOpacity style = {styles.item} onPress={()=>{props.navigation.navigate("Profile" , {'Profile_info' : item})}}>
                                <View style = {styles.thumbnail}>
                                    <Avatar rounded source = {{ uri : item.Profile_picture }} size = {'medium'}  />
                                    <View style = {styles.Name}>
                                        <Text style = {styles.Name_txt}>{item.Name + " " + item.Given_name}</Text>
                                        <Text>{item.Phone_number}</Text>
                                        <Text>{item.Village}</Text>
                                    </View>
                                </View>
        
                                <View style = {styles.more_info}>
                                    <Avatar rounded source = {{ uri : item.Signature }} size = {'medium'}  />
        
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
          )

    }else{
        return (
            <View style = {styles.Indicator}>
                <ActivityIndicator/>
                <Text>Loading Farmers...</Text>
            </View>
        )
    }
    
    
  
}

export default Verified

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    exportBtn : {
        width : ScreenWidth,
        height : 0.13 * ScreenHeight,
        justifyContent : 'center',
        alignItems : 'center'
    },
    listContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    item : {
        height : 0.15 * ScreenHeight,
        width : 0.94 * ScreenWidth,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    thumbnail : {
        width : 0.65 * ScreenWidth,
        height : 0.12 * ScreenHeight,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around',

    },
    Name : {
        width : 0.45 * ScreenWidth,
        height : 60,

        
    },
    Name_txt : {
        fontWeight : 'bold'
    },
    Indicator : {
        flex : 1,
        justifyContent : 'center',
        backgroundColor : 'white',
        alignItems : 'center'
     }

})
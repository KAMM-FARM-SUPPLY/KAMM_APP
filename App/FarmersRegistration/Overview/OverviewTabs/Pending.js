import React ,{useEffect , useState} from 'react'
import {View , Text , StyleSheet , Button , FlatList, TouchableOpacity , ActivityIndicator} from 'react-native'
import {Avatar} from 'react-native-elements'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import FarmerLogic from '../../../Helpers/Farmer'
import { Excel } from '../../../Helpers/Excel'



function Pending(props) {

    const [Unverified_users , setUnVerified_users] = useState(null)

    useEffect(()=>{
        FarmerLogic.Get_farmers('False' , setUnVerified_users)
        
    },[])

    
    if (Unverified_users == null){
        return (
            <View style = {styles.Indicator}>
                <ActivityIndicator/>
                <Text>Loading Farmers...</Text>
            </View>
        )

    }else {
        if (Unverified_users.length == 0){
            return (
                <View style = {styles.Indicator}>
                    <Text>No data available</Text>
                </View>
            )
        }
        return (
            <View style = {styles.container}>
                <View style = {styles.exportBtn}>
                    <View style = {{width : 0.7 * ScreenWidth}}>
                        <Button onPress={async()=>{await Excel.Export_to_excel(Unverified_users , 'Unverified Farmers')}} title='Export to excel'/>
                    </View>
                </View>
        
                <View style = {styles.listContainer}>
                    <FlatList
                        data = {Unverified_users}
                        renderItem={({item})=>(
                            <TouchableOpacity style = {styles.item} onPress = {()=>{props.navigation.navigate("Profile" , {'Profile_info' : item})}} >
                                <View style = {styles.thumbnail}>
                                    <Avatar rounded source = {{ uri : item.Profile_picture }} size = {'medium'}  />
                                    <View style = {styles.Name}>
                                        <Text style = {styles.Name_txt}>{item.Name}</Text>
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
    }

 
}

export default Pending

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
    } ,
     Indicator : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
     }

})
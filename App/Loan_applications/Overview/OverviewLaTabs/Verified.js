import React ,{useEffect , useState} from 'react'
import {View , Text , StyleSheet , Button , FlatList, TouchableOpacity , ActivityIndicator} from 'react-native'
import {Avatar} from 'react-native-elements'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import FarmerLogic from '../../../Helpers/Farmer'
import { Excel } from '../../../Helpers/Excel'
import { LoanApplication } from '../../../Helpers/LoanApplication'



function Verified(props) {

    const [Verified_applications , setVerified_applications] = useState(null)

    const onSuccess = (applications) => {
        setVerified_applications(applications)
    }

    const onError = () => {
        alert('An error occured')
    }

    useEffect(()=>{
        LoanApplication.GetApplicationsStatus(null , 'True' , onSuccess , onError)
    },[])

    
    if (Verified_applications == null){
        return (
            <View style = {styles.Indicator}>
                <ActivityIndicator/>
                <Text>Loading Applications...</Text>
            </View>
        )

    }else {
        if (Verified_applications.length == 0){
            return (
                <View style = {styles.Indicator}>
                    <Text>No data available</Text>
                </View>
            )
        }
        return (
            <View>
                
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
    } ,
     Indicator : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
     }

})
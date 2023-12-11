import React ,{useEffect , useState} from 'react'
import {View , Text , StyleSheet , Button , FlatList, TouchableOpacity , ActivityIndicator} from 'react-native'
import {Avatar} from 'react-native-elements'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import FarmerLogic from '../../../Helpers/Farmer'
import { Excel } from '../../../Helpers/Excel'
import { LoanApplication } from '../../../Helpers/LoanApplication'
import {useDispatch, useSelector} from 'react-redux'
import AppConstants from '../../../Constants/AppConstants'



function Verified(props) {

    const [Verified_applications , setVerified_applications] = useState(null)

    const onSuccess = (applications) => {
        setVerified_applications(applications)
    }

    const dispatch = useDispatch()
    const redux_state = useSelector(state => state.Reducer)

    const onError = () => {
        alert('An error occured')
    }

    useEffect(()=>{
        if (AppConstants.connected){
            LoanApplication.GetApplicationsStatus(null , 'True' , onSuccess , onError)
        }else{
            let applications = []
            redux_state['retrieved_data']['LoanApplications'].forEach(element => {
                if (element['Active'] == "True"){
                    applications.push(element)
                }
            });
            setVerified_applications(applications)
        }
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
            <View style = {styles.container}>
                <View style = {styles.exportBtn}>
                    <View style = {{width : 0.7 * ScreenWidth}}>
                        <Button onPress={async()=>{await Excel.Export_to_excel(Verified_applications , 'Verified Loan Applications')}} title='Export to excel'/>
                    </View>
                </View>
        
                <View style = {styles.listContainer}>
                    <FlatList
                        data = {Verified_applications}
                        renderItem={({item , index})=> {
                            //ongetfarmer_info(index , item.farmer)
                            return(
                                <TouchableOpacity style = {styles.item} onPress = {()=>{props.navigation.navigate("Loan Application" , {'Profile_info' : item})}} >
                                    <View style = {styles.thumbnail}>
                                        {(item.Active_picture != null) ? (
                                            <Avatar rounded source = {{ uri : item.Active_picture }} size = {'medium'}  />
                                        ) : (
                                            <Avatar rounded source = {require('../../../../assets/user_default.jpg')} size = {'medium'}  />
                                        )}
                                        <View style = {styles.Name}>
                                            {/* <Text style = {styles.Name_txt}>{(Farmer_info[index])?('Loading ...') : (Farmer_info[index]['Name'] + ' ' + Farmer_info[index]['Given_name'])}</Text> */}
                                            {/* <Text style = {styles.Name_txt}>{(Farmer_info[index])?('Loading ...') : (console.log(Farmer_info))}</Text> */}
                                            <Text style = {styles.Name_txt}>{item.Name + ' ' + item.Given_name}</Text>

                                            <NumberFormat value = { item.Total_cost } displayType = {'text'}
                                                thousandSeparator = {true}
                                                prefix = {'shs.'}
                                                renderText={value => <Text style = {{fontWeight : 'bold'}}>Amount: {value}</Text>}
                                            />
                                            <Text> Date created : {new Date(item.Date_added).toLocaleDateString()}</Text>
                                        </View>
                                    </View>
            
                                    <View style = {styles.more_info}>
                                        <Avatar rounded source = {{ uri : item.Signature }} size = {'medium'}  />
            
                                    </View>
                                </TouchableOpacity>
                            )
                            
                            

                        
                    }
                            
                        }
                    />
                </View>
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
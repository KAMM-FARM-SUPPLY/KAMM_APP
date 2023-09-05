import React , {useState , useEffect} from 'react'
import {View , Text , StyleSheet , FlatList , ScrollView , TouchableOpacity , ActivityIndicator} from 'react-native'
import {Avatar} from 'react-native-elements'
import Separator from '../../Components/Separator'
import {useDispatch, useSelector} from 'react-redux'
import { FarmerLogic } from '../../Helpers/Farmer'
import { ScreenWidth , ScreenHeight } from 'react-native-elements/dist/helpers'

function FarmersList(props) {
    const [Farmers , setFarmers] = useState(null)
    useEffect(()=>{

        FarmerLogic.get_farmer_village_list(props.route.params['name'] , setFarmers)
        
    },[])

    const dispatch = useDispatch()

    if (Farmers == null){
        return (
            <View style = {styles.Indicator}>
                <ActivityIndicator/>
                <Text>{'Loading farmers for ' + props.route.params['name'] + ' ...'}</Text>
            </View>
        )

    }else{
        if (Farmers.length == 0){
            return (
                <View style = {styles.Indicator}>
                    <Text>{'No data available for ' + props.route.params['name'] + ' ...'}</Text>
                </View>
            )
        }else {
            return (
                    <View style = {styles.container}>
                    {/* <View style = {styles.button}> */}
                        <Text style = {styles.heading}> Farmers List  </Text>
                        <View style = {styles.flatcontainer}>
                            <FlatList
                                ItemSeparatorComponent={()=><Separator/>}
                                contentContainerStyle = {{}}
                                data = {Farmers}
                                horizontal = {false}
                                renderItem={(Profile , index)=>(
                                    <TouchableOpacity  disabled = {(Profile.item.Active == 'True')?(false) : (true)} onPress = {()=>{
                                        if(props.route.params['LoanApplications']){
                                            dispatch({type : 'Loan_identity' , Loan_id : Profile.item.id})
                                            props.navigation.navigate('Application' , {'Profile_info' : Profile.item})
                                        } else {
                                            props.navigation.navigate('Profile' , {'Profile_info' : Profile.item})
                                        }
                                        
                                    }} style = {{...styles.comp , opacity : (Profile.item.Active ==='True')?(1) : (0.3)}}>
                                        <View style = {styles.Farmer_item}>
                                            <View style = {{width : 70 }}>
                                                <Avatar rounded source = {{ uri : Profile.item.Profile_picture }} size = {'medium'}  />
                                            </View>
                                            <Text>{Profile.item.Name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        
                    {/* </View> */}
                </View>
                
                
            )
        }
    }

    
}

export default FarmersList

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'flex-start',
        alignItems : 'center',
    },
    container_style : {
        justifyContent : 'center',
        alignItems : 'center'
    },
    button : {
        top : 20,
        width : 0.9 * ScreenWidth,
        justifyContent : 'center',
        
    },
    flatcontainer : {
        // flexGrow : 1,
        paddingTop : 0.1 * ScreenHeight,
        width : 0.97 * ScreenWidth,
        flex : 1,
        //backgroundColor : 'red',
        
    },
    district : {
        fontSize : 16,
        fontWeight : 'bold',
    },
    comp : {
        height : 70,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    Farmer_item : {
        width : 0.5 * ScreenWidth,
        height : 55,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
    },
    heading : {
        top : 0.05 * ScreenHeight,
        fontSize : 16,
        fontWeight : 'bold',
    },

    Indicator : {
        flex : 1,
        justifyContent : 'center',
        backgroundColor : 'white',
        alignItems : 'center'
     }
})
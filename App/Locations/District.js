import React , {useState , useEffect} from 'react'
import {View , Text , FlatList , ScrollView , StyleSheet , Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import {useDispatch, useSelector} from 'react-redux'
import Separator from '../Components/Separator'
import { Location } from '../Helpers/Location'
import AppConstants from '../Constants/AppConstants'

import { RFValue } from 'react-native-responsive-fontsize';



function District(props) {
    const [districts , setdistricts] = useState(null)

    const redux_state = useSelector(state => state.Reducer)


    useEffect(()=>{

        if (AppConstants.connected){
            Location.Get_districts(setdistricts)
        }else{
            setdistricts(redux_state['retrieved_data']['Locations'])
        }


    },[])

    const dispatch = useDispatch()

    if (districts == null){
        return(
            <View style = {styles.Indicator}>
                <ActivityIndicator/>
                <Text>Loading districts...</Text>
            </View>
        )

    }else{
        if (districts.length == 0){
            return (
                <View style = {styles.Indicator}>
                    <Text>No data available</Text>
                </View>
            )
        }else{
            return (
                <View style = {styles.container}>
                    <View style = {styles.button}>
                        <Button title='DISTRICTS'/>
                        <View style = {styles.flatcontainer}>
                            <FlatList
                                ItemSeparatorComponent={()=><Separator/>}
                                contentContainerStyle = {styles.flatcontainer}
                                data = {districts}
                                horizontal = {false}
                                renderItem={(District , index)=>(
                                    <TouchableOpacity onPress = {()=>{
                                        if (props.route.params != undefined){
                                            //Storing the value in the redux store
                                            if(props.route.params['registration']){
                                                dispatch({type : 'Add_field' , key : 'District' , value : District.item['name']})
                                                props.navigation.navigate("Subcounty" , {'district_id' :District.item['id'], 'name' : District.item['name'] ,'registration' : true })    
                                            } else if (props.route.params['farmer_overview']){
                                                props.navigation.navigate("Subcounty" , {'district_id' :District.item['id'], 'name' : District.item['name'] ,'farmer_overview' : true })    
                                            } else if (props.route.params['Loan_applications']){
                                                props.navigation.navigate("Subcounty LA" , {'district_id' : District.item['id'], 'name' : District.item['name'] ,'Loan_applications' : true})
                                            }
                                            
                                        } else {
                                            props.navigation.navigate("Subcounty" , {'info' :District.item  })
                                        }
        
        
                                    }} style = {styles.comp}>
                                    <Text style = {styles.district}>{District.item['name']}</Text>
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

export default District

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
        fontSize: RFValue(16), // Use responsive font size
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
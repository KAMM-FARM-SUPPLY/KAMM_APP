import React , {useState , useEffect} from 'react'
import {View , Text , FlatList , ScrollView , StyleSheet , Button, TouchableOpacity , ActivityIndicator } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import Separator from '../Components/Separator'
import {useDispatch, useSelector} from 'react-redux'
// import Farmer from '../Helpers/Farmer'
import { FarmerLogic } from '../Helpers/Farmer'
import { Location } from '../Helpers/Location'



function Village(props) {

  useEffect(()=>{
    // console.log(props.route.params)
    Location.Get_villages(setvillages , props.route.params['County_id'])
  },[])

  const [villages , setvillages] = useState(null)

  //const {Name : SubCounty , Village : Villages } = props.route.params['info']

  const dispatch = useDispatch()


  const get_farmer_list_Loan = (info)=>{
    props.navigation.navigate('Farmers List LA' , {'info' : info , 'LoanApplications' : true})
  }
  

  if (villages == null){

    return (
        <View style = {styles.Indicator}>
            <ActivityIndicator/>
            <Text>Loading Villages...</Text>
        </View>
    )

  }else{
    if (villages == 0){

        return (
            <View style = {styles.Indicator}>
                <Text>No data available</Text>
            </View>
        )

    }else{
        return (
            <View style = {styles.container}>
                <View style = {styles.button}>
                    <Button title={'VILLAGES FOR ' + props.route.params['name']}/>
                    <View style = {styles.flatcontainer}>
                        <FlatList
                            ItemSeparatorComponent={()=><Separator/>}
                            contentContainerStyle = {styles.flatcontainer}
                            data = {villages}
                            horizontal = {false}
                            renderItem={(Village , index)=>(
                                <TouchableOpacity onPress = {()=>{
                                    // console.log(props.route.params)
                                    if(props.route.params['registration']){
                                        
                                        dispatch({type : 'Add_field' , key : 'Village' , value : Village.item.name })
                                        props.navigation.navigate('Basic Info')
                                    } else if (props.route.params['farmer_overview']){
                                        props.navigation.navigate('Farmers List' , {'name' : Village.item.name})
                                        
                                    } else if (props.route.params['Loan_applications']){
                                        props.navigation.navigate('Farmers List LA' , {'name' : Village.item.name , 'LoanApplications' : true})
                                        //FarmerLogic.get_farmer_village_list(Village.item.name,get_farmer_list_Loan)
                                    }
                                }} style = {styles.comp}>
                                    <Text style = {styles.district}>{Village.item.name}</Text>
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

export default Village

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
        fontSize : 16,
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
import React , {useState , useEffect} from 'react'
import {View , Text , StyleSheet , ScrollView , Button , Image , TouchableHighlight, Alert} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux'
// import { Image as Compressor } from 'react-native-compressor';


import { RFValue } from 'react-native-responsive-fontsize';


function NIN_Photos(props) {
    const [front_side , setfront_side] = useState(null)
    const [back_side , setback_side] = useState(null)
    const [Action , setAction] = useState(false)

    const redux_state = useSelector(state => state.Reducer)
    console.log(redux_state['registration'])

    const dispatch = useDispatch()

    useEffect(()=>{
        if (redux_state['Farmer_info_visit'] != false){
            setfront_side(redux_state['Farmer_info_visit'].Front_side_id)
            setback_side(redux_state['Farmer_info_visit'].Hind_side_id)
        }
    },[])

  return (
    <ScrollView style = {{flex : 1}} contentContainerStyle = {styles.container_style}>
        <View style = {styles.id_caps}>
            <Text style = {styles.caption}>Front side</Text>
            <TouchableOpacity 
            onPress = { async ()=>{
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status === "granted"){
                try {
                    let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                    });
                    if (!result.canceled) {
                        // const result = await Compressor.compress(result.uri);
                        // console.log(result)
                        setfront_side(result.uri)
                        setTimeout(()=>{
                            setAction(true)
                        } , 100)
                    }
                    } catch (E) {
                    console.log(E);
                    }} else {
                        console.log("No permissions")
                    }
                
            }} style = {styles.front}>
                {(front_side != null)? (
                    <Image source = {{uri : front_side}} style = {styles.pic} />
                ) : (
                    <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'user' , type : 'font-awesome' }} size = {'xlarge'}  />
                )}
              
              <View style = {styles.cam_icon}>
                    <TouchableOpacity onPress = {
                    async () => {
                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                        if (image.uri){
                            setfront_side(image.uri)
                            setTimeout(()=>{
                                setAction(true)
                            } , 100)
                        } else {
                            console.log("No image")
                        }
                    }
                } >
                        <Avatar rounded containerStyle = {{ backgroundColor : 'white' , elevation :  10,   }} icon = {{  name : 'camera' , color : '#246EE9', type : 'font-awesome' }} size = {'medium'} />
                    </TouchableOpacity>
            </View>  
            </TouchableOpacity>

            <Text style = {styles.caption}>Back side</Text>

            <TouchableOpacity 
            onPress = {async ()=>{
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status === "granted"){
                try {
                    let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                    });
                    if (!result.canceled) {
                        setback_side(result.uri)
                        setTimeout(()=>{
                            setAction(true)
                        } , 100)
                    }
                    } catch (E) {
                    console.log(E);
                    }} else {
                        console.log("No permissions")
                    }
            }} 
            style = {styles.front}>
                {(back_side != null)? (
                        <Image source = {{uri : back_side}} style = {styles.pic} />
                    ) : (
                        <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'user' , type : 'font-awesome' }} size = {'xlarge'}  />
                    )}
            

         <View style = {styles.cam_icon}>
            <TouchableOpacity onPress = {
            async () => {
                let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                if (image.uri){
                    setback_side(image.uri)
                    setTimeout(()=>{
                        setAction(true)
                    } , 100)
                } else {
                    console.log("No image")
                }
            }
        } >
                <Avatar rounded containerStyle = {{ backgroundColor : 'white' , elevation :  10,   }} icon = {{  name : 'camera' , color : '#246EE9', type : 'font-awesome' }} size = {'medium'} />
            </TouchableOpacity>
        </View>  
            </TouchableOpacity>
        </View>

        <View style = {styles.button}>
            <Button onPress = {()=>{
                if(front_side != null){
                    dispatch({type : 'Add_reg_pic' , key : 'front-side(NIN)' , pic : front_side})
                }else{
                    Alert.alert('Farmer Registration' , "Please add the front side of the national id by tapping the camera icon and taking the picture ")
                    return
                }
                if (back_side != null){
                    dispatch({type : 'Add_reg_pic' , key : 'back-side(NIN)' , pic : back_side})
                }else {
                    Alert.alert('Farmer Registration' , "Please add the back side of the national id by tapping the camera icon and taking the picture ")
                    return
                }
                props.navigation.navigate("Profile picture")
            }} title='Next' />
        </View>
        

    </ScrollView> 
    
  )
}

export default NIN_Photos

const styles = StyleSheet.create({
    container_style : {
        justifyContent : 'space-around',
        alignItems : 'center'

    },
    id_caps : {
        marginTop : 20,
        width : 0.9 * ScreenWidth,
        height : 0.7 * ScreenHeight,
        flexDirection : 'column',
        justifyContent : 'space-around',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : 'black',
        borderRadius : 10
        
        
    },
    button : {
        width : 0.4 * ScreenWidth,
        height : 0.1 * ScreenHeight,
        marginTop : 20
    },
    front : {
        height : 0.3 * ScreenHeight,
        width : 0.8 * ScreenWidth,
        backgroundColor : 'black',
        justifyContent : 'center',
        alignItems : 'center'

    },
    pic : {
        height : 0.3 * ScreenHeight,
        width : 0.8 * ScreenWidth,
    },
    caption : {
        fontSize : 14,
        fontWeight : 'bold',
    },
    pos : {
        // color : 'white',
        position : 'absolute',
        top : 20
    },
    cam_icon : {
        position : 'absolute' ,
        top : 20 ,
        right : 20
        
    }

})
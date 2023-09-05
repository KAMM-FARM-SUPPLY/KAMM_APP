import React, {useState , useEffect} from 'react'
import {View , Text , StyleSheet , TouchableOpacity , ScrollView , Button} from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux'


function Profile_pic(props) {
    const [Pic , SetPic] = useState(false)
    const [Action , setAction] = useState(false)
    const [pressed , setpressed] = useState(false)

    const redux_state = useSelector(state => state.Reducer)
    const dispatch = useDispatch()

  return (
    <ScrollView contentContainerStyle = {styles.container_style} style = {styles.container}>
            <TouchableOpacity style = {styles.input_container_2} onPress = {
                async ()=>{
                    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                            if (status === "granted"){
                            try {
                                let result = await ImagePicker.launchImageLibraryAsync({
                                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                  allowsEditing: true,
                                  aspect: [4, 3],
                                  quality: 1,
                                });
                                if (!result.cancelled) {
                                    SetPic(result.uri)
                                    setTimeout(()=>{
                                        setAction(true)
                                    } , 100)
                                }
                              } catch (E) {
                                console.log(E);
                              }} else {
                                  console.log("No permissions")
                              }
                }
            } >
                { Action ? ( 
                    <Avatar rounded source = {{ uri : Pic }} size = {'xlarge'}  />

                 ) : (
                    <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'user' , type : 'font-awesome' }} size = {'xlarge'}  />
                  ) }
                
                <TouchableOpacity style = {{ position : 'absolute' , top : ScreenHeight * 0.31, right : ScreenWidth *0.3 }} onPress = {
                    async () => {
                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                        if (image.uri){
                            SetPic(image.uri)
                            setTimeout(()=>{
                                setAction(true)
                            } , 100)
                        } else {
                            console.log("No image")
                        }
                    }
                } >
                <Avatar rounded containerStyle = {{ backgroundColor : 'white' , elevation : 10 ,  }} icon = {{  name : 'camera' , color : '#246EE9', type : 'font-awesome' }} size = {'medium'} />
                </TouchableOpacity>
            </TouchableOpacity>
           <View style = {styles.button}>
                <Button onPress = {()=>{
                    dispatch({type : 'Add_reg_pic' , key : 'Profile-photo' , pic : Pic})
                    props.navigation.navigate("Signature")
                }} title='Next' />
           </View>
            
            

    </ScrollView>
  )
}

export default Profile_pic

const styles = StyleSheet.create({
    container : {
        flex : 1,
        
        
    },
    container_style  : {
        flexDirection : 'column',
        justifyContent : 'space-around',
        alignItems : 'center',

    },
    input_container : {
        height : 0.76 * ScreenHeight,
        width : 0.9 * ScreenWidth,
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    input_container_2 : {
        position : 'relative',
        flexDirection : 'column',
        justifyContent : 'space-around',
        alignItems : 'center',
        height : ScreenHeight * 0.5,
        width : ScreenWidth ,
        
    },
    button : {
        height : 0.1 * ScreenHeight,
        width : 0.45 *ScreenWidth,
       
    }
})
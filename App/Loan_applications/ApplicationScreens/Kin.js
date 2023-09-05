import React ,{useState , useEffect , useRef}from 'react'
import {View , Text , StyleSheet , ScrollView , FlatList , Button, TouchableOpacity , TextInput , Image} from 'react-native'
import {Avatar , } from 'react-native-elements'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux'
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from "react-native-phone-number-input";
import * as mime from 'react-native-mime-types'



function Kin(props) {

    const [Pic , SetPic] = useState(null)
    const [Action , setAction] = useState(false)
    const [Action_2 , setAction_2] = useState(false)
    const [front_side , setfront_side] = useState(null)
    const [hind_side , sethind_side] = useState(null)
    const [Surname , setSurname] = useState('')
    const [GivenName , setGivenName] = useState('')


    //NIN validation
    const [NIN , setNIN] = useState("")
    const [NIN_char , setNIN_char] = useState(0)

    //Telephone number validation
    const [Phone , setPhone] = useState(null)
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);

    const phoneInput = useRef();
    const validate_number = (number) => {
        const checkValid = phoneInput.current?.isValidNumber(number);
        console.log(number)
        setValid(checkValid)
    }

    const dispatch = useDispatch()
    const redux_state = useSelector(state => state.Reducer)

    console.log(formattedValue)

    const store_kin_redux = () => {

        //Working on the picture 
        if (Pic != null){
            const newImageUri = "file:///" + Pic.split("file:/").join("")

            let processed_picture = {
                uri : newImageUri,
                type : mime.lookup(newImageUri),
                name : newImageUri.split("/").pop()
            }
            dispatch({type : 'Loan_images' , key : 'Kin_image' , value: processed_picture })
        }else {
            dispatch({type : 'Loan_images' , key : 'Kin_image' , value : null })
        }

        //Working on the name 
        dispatch({type : 'Loan_app_kin' , key : 'surname' , value : Surname })
        dispatch({type : 'Loan_app_kin' , key : 'given_name' , value : GivenName})

        //Working on the NIN number and phone number
        dispatch({type : 'Loan_app_kin' , key : 'nin_number' , value : NIN})
        dispatch({type : 'Loan_app_kin' , key : 'telephone_number' , value : formattedValue})

        //Working on the National ids 
        if (front_side != null){
            const newImageUri = "file:///" + front_side.split("file:/").join("")

            let processed_picture = {
                uri : newImageUri,
                type : mime.lookup(newImageUri),
                name : newImageUri.split("/").pop()
            }
            dispatch({type : 'Loan_images' , key : 'front_side_id' , value: processed_picture })
        }else {
            dispatch({type : 'Loan_images' , key : 'front_side_id' , value : null })
        }

        if (hind_side != null){
            const newImageUri = "file:///" + hind_side.split("file:/").join("")

            let processed_picture = {
                uri : newImageUri,
                type : mime.lookup(newImageUri),
                name : newImageUri.split("/").pop()
            }
            dispatch({type : 'Loan_images' , key : 'back_side_id' , value: processed_picture })
        }else {
            dispatch({type : 'Loan_images' , key : 'back_side_id' , value : null })
        }

        
    }


  return (
    <ScrollView style = {{flex : 1}} contentContainerStyle = {styles.container} >
        <Text style = {styles.heading}>Profile Picture</Text>
        <View style = {styles.pic}>
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

        </View>
        <Text style = {styles.heading}> Personal Information </Text>
        <View style = {styles.info}>

            <View style = {styles.input}>
                <Text>Surname *</Text>
                <TextInput
                    autoCapitalize='words'
                    placeholder='Enter your surname'
                    style={styles.input_control}
                    onChangeText={(text)=>{
                        setSurname(text)
                    }}
                    value={Surname}
                />
            </View>

            <View style = {styles.input}>
                <Text>Given Name *</Text>
                <TextInput
                    placeholder='Enter given names'
                    autoCapitalize='words'
                    style={styles.input_control}
                    onChangeText={(text)=>{
                        setGivenName(text)
                    }}
                    value={GivenName}
                />
            </View>

            
            <View style = {{...styles.input , height : 0.14 * ScreenHeight}}>
                <View style = {styles.error}>
                    <Text>Telephone number *</Text>
                    {(valid)?(
                        <View style = {styles.validate_icon}>
                            <Avatar rounded containerStyle = {{ backgroundColor : 'green' , elevation :10  }} size = {'small'} icon = {{  name : 'check' , color : 'white', type : 'font-awesome' , size : 16 }}  />
                            <Text style = {{color : 'green'}}>Valid</Text>
                        </View>
                    ) : (
                        <View style = {{...styles.validate_icon , width : 0.28 * ScreenWidth}}>
                            <Avatar rounded containerStyle = {{ backgroundColor : 'red' , elevation :10  }} size = {'small'} icon = {{  name : 'times' , color : 'white', type : 'font-awesome' , size : 16 }}  />
                            <Text style = {{color : 'red'}}>Not valid</Text>
                        </View>

                    )}
                </View>
                <PhoneInput
                        containerStyle = {{...styles.input_control , height : 52 , elevation : 0 , backgroundColor : 'transparent' , borderBottomColor : valid ? 'black' :'red'}}
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="UG"
                        layout="first"
                        onChangeText={(text) => {
                            setValue(text);
                            validate_number(text)
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        withDarkTheme = {false}
                        withShadow
                    />    

            </View>

            <View style = {styles.input}>
                <View style = {styles.error}>
                    <Text>NIN number * </Text>
                    {(NIN_char == 14 || NIN_char == 0)?(
                        <View style = {styles.validate_icon}>
                            {(NIN.length > 0) ? (
                            <Avatar rounded containerStyle = {{ backgroundColor : 'green' , elevation :10  }} size = {'small'} icon = {{  name : 'check' , color : 'white', type : 'font-awesome' , size : 16 }}  />
                            ) : (<View/>)}
                            <Text style = {{color : 'green'}}>{(NIN.length > 0)?'Valid' : ''}</Text>
                        </View>
                    ) : (
                        <View style = {{...styles.validate_icon , width : 0.6 * ScreenWidth}}>
                            <Avatar rounded containerStyle = {{ backgroundColor : 'red' , elevation :10  }} size = {'small'} icon = {{  name : 'times' , color : 'white', type : 'font-awesome' , size : 16 }}  />
                            <Text style = {{color : 'red'}}>{NIN_char} more characters left</Text>
                        </View>
                    )}
                </View>
                <TextInput
                    autoCapitalize='characters'
                    value = {NIN}
                    placeholder='Enter NIN number'
                    style={{...styles.input_control , borderBottomColor : (NIN_char == 14 || NIN_char == 0) ? 'black' : 'red'}}
                    onChangeText={(text)=>{
                        if (text[0] != 'C' && ((text[1] !='M') || (text[1]!='F'))){
                            alert('NIN number should begin with either CF or CM')
                        }else {
                            setNIN_char(14 - text.length)
                            setNIN(text)
                        }
                        
                    }}
                    // onChangeText={onChangeText}
                    // value={text}
                />
            </View>
            
        </View>

        <Text style = {styles.heading}>Front Side of National ID</Text>
        <View style = {styles.NIN_photo}>
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
                        setfront_side(result.uri)
                        setTimeout(()=>{
                            setAction_2(true)
                        } , 100)
                    }
                    } catch (E) {
                    console.log(E);
                    }} else {
                        console.log("No permissions")
                    }
                
            }} style = {styles.front}>
                {(front_side != null)? (
                    <Image source = {{uri : front_side}} style = {styles.pic_id} />
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
                                setAction_2(true)
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

        <Text style = {styles.heading}>Back Side of National ID</Text>
        <View style = {styles.NIN_photo}>
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
                        sethind_side(result.uri)
                        setTimeout(()=>{
                            setAction_2(true)
                        } , 100)
                    }
                    } catch (E) {
                    console.log(E);
                    }} else {
                        console.log("No permissions")
                    }
                
            }} style = {styles.front}>
                {(front_side != null)? (
                    <Image source = {{uri : hind_side}} style = {styles.pic_id} />
                ) : (
                    <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'user' , type : 'font-awesome' }} size = {'xlarge'}  />
                )}
              
              <View style = {styles.cam_icon}>
                    <TouchableOpacity onPress = {
                    async () => {
                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                        if (image.uri){
                            sethind_side(image.uri)
                            setTimeout(()=>{
                                setAction_2(true)
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

        <View style = {{height : 100 , width : 0.6 * ScreenWidth , justifyContent : 'center' }}>
        <Button containerStyle = {{width : 0.7 * ScreenWidth}} style = {{backgroundColor : 'red'}} onPress = {()=>{

            store_kin_redux()

            props.navigation.navigate('Next of Kin Signature')
            
          }} icon={
              <Icon
                style = {{paddingLeft : 10}}
                name="arrow-right"
                size={15}
                color="white"
              />
            }  iconRight title='NEXT'/>


        </View>
        

    </ScrollView>
  )
}

export default Kin

const styles = StyleSheet.create({
    container : {
        alignItems : 'center'

    },
    pic : {
        width : ScreenWidth,
        height : 0.35 * ScreenHeight,
        alignItems : 'center',
        justifyContent : 'space-around',

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
    info : {
        height : 0.6 * ScreenHeight,
        width : ScreenWidth ,
        // backgroundColor :'red',
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    heading : {
        fontSize : 16,
        fontWeight : 'bold',
    },
    input : {
        width : 0.98 * ScreenWidth,
        height : 0.1 * ScreenHeight,
        justifyContent : 'space-between',
        alignItems : 'flex-start',
        // backgroundColor : 'red'

    },
    input_control: {
        height: 20,
        width : 0.9 * ScreenWidth,
        margin: 12,
        borderBottomWidth : 1,
        fontWeight : 'bold',

        // borderWidth: 1,
        // padding: 5,

      },
      NIN_photo : {
        height : 0.35 * ScreenHeight,
        width : ScreenWidth,
        justifyContent : 'center',
        alignItems : 'center'
      },
      front : {
        height : 0.3 * ScreenHeight,
        width : 0.8 * ScreenWidth,
        backgroundColor : 'black',
        justifyContent : 'center',
        alignItems : 'center'

        },
        cam_icon : {
            position : 'absolute' ,
            top : 20 ,
            right : 20
            
        },
        pic_id : {
            height : 0.3 * ScreenHeight,
            width : 0.8 * ScreenWidth,
        },
        error : {
            height : 20,
            width : 0.97 * ScreenWidth,
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center'
        },
        validate_icon : {
            height : 20,
            width : 0.22 * ScreenWidth,
            flexDirection : 'row',
            justifyContent : 'space-around',
            alignItems : 'center',
        }

})


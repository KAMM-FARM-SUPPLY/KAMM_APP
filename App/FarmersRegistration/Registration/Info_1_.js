import React ,{useState , useEffect , useRef}from 'react'
import {View , Text , StyleSheet , ScrollView , FlatList , Button, TouchableOpacity , TextInput , Image , DatePickerAndroid} from 'react-native'
import {Avatar , } from 'react-native-elements'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux'
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from "react-native-phone-number-input";
// import DateTimePicker from '@react-native-community/datetimepicker';


function Info_1_(props) {

    //NIN validation
    const [NIN , setNIN] = useState("")
    const [NIN_char , setNIN_char] = useState(0)

    //Telephone number validation
    const [Phone , setPhone] = useState(null)
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);

    //BirthDate
    const [BirthDate , setBirthDate] = useState('')

    const phoneInput = useRef();
    const validate_number = (number) => {
        const checkValid = phoneInput.current?.isValidNumber(number);
        console.log(number)
        setValid(checkValid)
    }

    // const pick_Birth_date = async () => {
    //     try{
    //         const {action , year , month , day} = await DateTimePickerAndroid.open({ 
    //             date : new Date(),
    //             mode : 'default',
    //          })

    //          if (action !== DatePickerAndroid.dismissedAction){
    //             setBirthDate(year + "-" + month + "-" + day)
    //          }
    
    //     } catch ({code , message}){
    //         console.warn("Cannot open date picker",message)
    
    //     }
    // }
  return (
    <ScrollView style = {{flex : 1}} contentContainerStyle ={styles.container} >

        <Text style = {styles.heading}> Personal Information </Text>
            <View style = {styles.info}>

                <View style = {styles.input}>
                    <Text>Surname *</Text>
                    <TextInput
                        autoCapitalize='words'
                        placeholder='Enter your surname'
                        style={styles.input_control}
                        // onChangeText={onChangeText}
                        // value={text}
                    />
                </View>

                <View style = {styles.input}>
                    <Text>Given Name *</Text>
                    <TextInput
                        placeholder='Enter given names'
                        autoCapitalize='words'
                        style={styles.input_control}
                        // onChangeText={onChangeText}
                        // value={text}
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
                    <Text>Date of Birth *</Text>
                    <TextInput
                        placeholder='Enter Date of Birth'
                        autoCapitalize='words'
                        value = {BirthDate}
                        style={styles.input_control}
                        onFocus = {
                            () => {
                                // pick_Birth_date()
                            }
                        }
                        // onChangeText={onChangeText}
                        // value={text}
                    />
                </View>
               
                
            </View>


    </ScrollView>
  )
}

export default Info_1_

const styles = new StyleSheet.create({
    container : {
        alignItems : 'center'

    },
    info : {
        height : 0.6 * ScreenHeight,
        width : ScreenWidth ,
        // backgroundColor :'red',
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    input_control: {
        height: 20,
        width : 0.9 * ScreenWidth,
        margin: 12,
        borderBottomWidth : 1,
        fontWeight : 'bold',
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
    },
    input : {
        width : 0.98 * ScreenWidth,
        height : 0.1 * ScreenHeight,
        justifyContent : 'space-between',
        alignItems : 'flex-start',
        // backgroundColor : 'red'

    },

})
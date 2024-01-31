import React ,{useState , useEffect , useRef}from 'react'
import {View , Text , StyleSheet , ScrollView, FlatList , Button, TouchableOpacity , TextInput , Image, Alert } from 'react-native'
import {Avatar , } from 'react-native-elements'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux'
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from "react-native-phone-number-input";
import * as mime from 'react-native-mime-types'
import DropDown from "react-native-paper-dropdown";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import { RFValue } from 'react-native-responsive-fontsize';


function Screen_1(props) {

    const [Surname , setSurname] = useState('')
    const [GivenName , setGivenName] = useState('')
    const [selectedgender , setSelectedgender] = useState('Male')
    const genderList = [
        {
            value: 'Male',
            label: 'male',
        },
        {
          value: "Female",
          label: "female",
        },
        {
          value: "Others",
          label: "others",
        },
      ];
      function onChangeGender() {
        return (val) => setSelectedgender(val)
      }
    
    const [Marital_status , setMarital_status] = useState('Single')
    const MaritalList = [
        {
            value: 'Single',
            label: 'single',
        },
        {
          value: "Married",
          label: "married",
        },
        {
          value: "Divorced",
          label: "divorced",
        },
      ];
      function onChangeMarital() {
        return (val) => setMarital_status(val)
      }
    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState("");
    const [Year_of_birth , setYear_of_birth] = useState(null)
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

    //NIN validation
    const [NIN , setNIN] = useState("")
    const [NIN_char , setNIN_char] = useState(0)

    //Telephone number validation
    const [Phone , setPhone] = useState(null)
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [Coffee_coverage , setCoffee_coverage] = useState(0)
    const [Ov_coffee_prod , setOv_coffee_prod] = useState(0)
    const [Total_land_acreage , set_Total_land_acreage] = useState(0)
    const [No_of_trees , setNo_of_trees] = useState(0)
    const [Unproductive_trees , setUnproductive_trees] = useState(0)


    const phoneInput = useRef();
    const validate_number = (number) => {
        const checkValid = phoneInput.current?.isValidNumber(number);
        setValid(checkValid)
    }

    const dispatch = useDispatch()
    const redux_state = useSelector(state => state.Reducer)


    const setDate = (event, date) =>{
        setYear_of_birth(date)
    }

    const onSubmit = () => {
        // Actions on submit button click.

        dispatch({type : 'Add_field' , key : 'Added_by' , value : 3})
        
        dispatch({type : 'Add_field' , key : 'Coffee_acreage' , value : Coffee_coverage})
        dispatch({type : 'Add_field' , key : 'Ov_coffee_prod' , value : Ov_coffee_prod})
        if (selectedgender != ''){
            dispatch({type : 'Add_field' , key : 'Gender' , value : selectedgender})
        }else {
            alert("Please select the gender.")
            return
        }
        dispatch({type : 'Add_field' , key : 'Total_land_acreage' , value : Total_land_acreage})

        if (Surname != '' && GivenName != ''){
            dispatch({type : 'Add_field' , key : 'Name' , value : Surname})
            dispatch({type : 'Add_field' , key : 'Given_name' , value : GivenName})
        }else {
            alert('Please enter the name of the farmer.')
            return
        }
        
        if(NIN != ''){
            dispatch({type : 'Add_field' , key : 'NIN_no' , value : NIN})
        }else{
            Alert.alert("Farmer Registration"  , "Please enter the NIN number of the farmer" )
            return
        }
        dispatch({type : 'Add_field' , key : 'No_of_trees' , value : No_of_trees})
        dispatch({type : 'Add_field' , key : 'Unproductive_trees' , value : Unproductive_trees})

        if (Marital_status != ''){
            dispatch({type : 'Add_field' , key : 'Marital_status' , value : Marital_status})
        }else{
            Alert.alert("Farmer registration", 'Please select the marital status of the farmer')
            return
        }

        if(Year_of_birth != null){
            dispatch({type : 'Add_field' , key : 'Year_of_birth' , value : Year_of_birth})

        }else {
            Alert.alert("Farmer registration", 'Please select the date of birth of the farmer')
            return
        }

        if (valid){
            dispatch({type : 'Add_field' , key : 'Phone_number' , value : formattedValue})
        }else {
            Alert.alert("Farmer registration", 'Please validate the phone number before continuing')
            return
        }

        // console.log(formFields)
        props.navigation.navigate("National Id photos")

      }



    useEffect(()=>{

        if (redux_state['Farmer_info_visit'] != false){
            //Filling in the fields 
            let info = redux_state['Farmer_info_visit']
            //console.log(info)
            setCoffee_coverage(String(info.Coffee_acreage))
            setOv_coffee_prod(String(info.Ov_coffee_prod))
            set_Total_land_acreage(String(info.Total_land_acreage))
            setNo_of_trees(String(info.No_of_trees))
            setUnproductive_trees(String(info.Unproductive_trees))
            setNIN(String(info.NIN_no))
            setNIN_char(14)
            setSurname(info.Name)
            setGivenName(info.Given_name)
            setMarital_status(info.Marital_status)
            setValue(String(info.Phone_number))
            setYear_of_birth(new Date())
            setGender(info.Gender)
            setValid(true)

        }
    
    },[])

    
  return (
    <ScrollView style = {{flex : 1}} contentContainerStyle = {styles.container} >
        <View style = {styles.info}>

            <View style = {styles.input}>
                <Text style = {styles.fields}>Surname *</Text>
                <TextInput
                    autoCapitalize='words'
                    placeholder='Enter your surname'
                    style={styles.input_control}
                    onChangeText={(text)=>{
                        setSurname(text)
                        //test = text
                    }}
                    value={Surname}
                />
            </View>

            <View style = {styles.input}>
                <Text style = {styles.fields}>Given Name *</Text>
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

            <View style = {styles.input}>
                <Text style = {styles.fields}>Select Marital Status *</Text>
                
                <Picker
                    style = {{width : 0.95 * ScreenWidth}}
                    selectedValue={Marital_status}
                    onValueChange={(itemValue, itemIndex) =>{
                        setMarital_status(itemValue)

                    }
                    }>
                    <Picker.Item label="single" value="Single" />
                    <Picker.Item label="married" value="Married" />
                    <Picker.Item label="divorced" value="Divorced" />
                </Picker>
            </View>    

            
            

            {
                    (redux_state['Farmer_info_visit'] ? (
                        <View style = {styles.input}>
                            <Text style = {styles.fields}>Phone Contact *</Text>
                            <TextInput
                                placeholder='Enter the new contact if any with +256...'
                                autoCapitalize='words'
                                style={styles.input_control}
                                onChangeText={(text)=>{
                                    setValue(text)
                                }}
                                value = {value}

                            />
                        </View>
                    ) : (
                        <View style = {{...styles.input , height : 0.14 * ScreenHeight}}>
                            <View style = {styles.error}>
                                <Text style = {styles.fields}>Telephone number *</Text>
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
                            //value={'758989094'}
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
                    ))
                }  
            
              
            
            <View style = {styles.input}>
                <Text style = {styles.fields}>Date of birth *</Text>
                <TextInput
                    placeholder='Tap to select date'
                    autoCapitalize='words'
                    style={styles.input_control}
                    onFocus={()=>{
                        DateTimePickerAndroid.open({mode : 'date' , value : new Date() , onChange : setDate})
                    }}
                    onChangeText={(text)=>{
                    }}
                    value = {(Year_of_birth != null) ? (Year_of_birth.toDateString()) : ('')}
                />
            </View>

            <View style = {styles.input}>
                <Text style = {styles.fields}>Select Gender *</Text>
                
                <Picker
                    style = {{width : 0.95 * ScreenWidth}}
                    selectedValue={selectedgender}
                    onValueChange={(itemValue, itemIndex) =>{
                        setSelectedgender(itemValue)

                    }
                    }>
                    <Picker.Item label="male" value="Male" />
                    <Picker.Item label="female" value="Female" />
                </Picker>
            </View>    
            

            <View style = {styles.input}>
                <Text style = {styles.fields}>Coffee coverage *</Text>
                <TextInput
                    placeholder='Enter the coffee coverage'
                    autoCapitalize='words'
                    style={styles.input_control}
                    onChangeText={(text)=>{
                        setCoffee_coverage(text)
                    }}
                    value = {Coffee_coverage}

                />
            </View>

            <View style = {styles.input}>
                <Text style = {styles.fields}>Overall Coffee production *</Text>
                <TextInput
                    placeholder='Enter the coffee production'
                    value = {Ov_coffee_prod}
                    autoCapitalize='words'
                    style={styles.input_control}
                    onChangeText={(text)=>{
                        setOv_coffee_prod(text)
                    }}
                />
            </View>

            <View style = {styles.input}>
                <Text style = {styles.fields}>Total Land coverage *</Text>
                <TextInput
                    placeholder='Total Land coverage'
                    value = {Total_land_acreage}
                    autoCapitalize='words'
                    style={styles.input_control}
                    onChangeText={(text)=>{
                        set_Total_land_acreage(text)
                    }}
                />
            </View>

            <View style = {styles.input}>
                <Text style = {styles.fields}>Number of trees *</Text>
                <TextInput
                    placeholder='Enter the number of coffee plants'
                    autoCapitalize='words'
                    value = {No_of_trees}
                    style={styles.input_control}
                    onChangeText={(text)=>{
                        setNo_of_trees(text)
                    }}
                />
            </View>
            
            <View style = {styles.input}>
                <Text style = {styles.fields}>Unproductive Trees *</Text>
                <TextInput
                    placeholder='Enter the number of unproductive trees'
                    autoCapitalize='words'
                    value = {Unproductive_trees}
                    style={styles.input_control}
                    onChangeText={(text)=>{
                        setUnproductive_trees(text)
                    }}
                />
            </View>



            <View style = {styles.input}>
                <View style = {styles.error}>
                    <Text style = {styles.fields}>NIN number * </Text>
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

       

        <View style = {{height : 100 , width : 0.6 * ScreenWidth , justifyContent : 'center' }}>
        <Button containerStyle = {{width : 0.7 * ScreenWidth}} style = {{backgroundColor : 'red'}} onPress = {()=>{

            onSubmit()
            
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

export default Screen_1

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
        height : 2 * ScreenHeight,
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
        //fontWeight : 'bold',
        fontSize : RFValue(14)
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
        },
        fields : {
            fontSize : RFValue(15),
            fontWeight : 'bold'
        }

})


import React, { useCallback, useEffect, useState } from 'react';
import { Text, View , StyleSheet , SafeAreaView , ScrollView , Image , TextInput , Button } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import {connect , Provider} from 'react-redux';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers/index.js';
import { FontFamily, FontSize, Color } from "../App/Constants/GlobalStyles.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import AppConstants from './Constants/AppConstants.js';
import { Administrative } from './Helpers/administrative.js';
import Spinner from 'react-native-loading-spinner-overlay'

// Keep the splash screen visible while we fetch resources

export default function Login(props) {

    const [username , setusername] = useState('')
    const [password , setpassword] = useState('')
    const [logging_in , setlogging_in] = useState(false)
    const [logging_text , setlogging_text] = useState('')

  useEffect(() => {
   
  }, []);

  

  return (
        <ScrollView style = {{ flex : 1 , top : 30 , backgroundColor : 'white'}} contentContainerStyle = {{alignItems : 'center'}}>
            <Spinner
                    visible={logging_in}
                    textContent={logging_text}
                    textStyle={styles.spinnerTextStyle}
            />
            <View style = {styles.bg_image}>
                <Image source={require('../assets/security.jpg')}  style = {styles.image}/>
            </View>

            <View style = {styles.headings}>
                <Text style = {styles.heading}>KAMM FARM SERVICES</Text>
                <Text style = {styles.subheading}>LOGIN</Text>
            </View>

            <View style = {styles.inputs}>
                <TextInput
                        autoCapitalize='words'
                        placeholder='Enter your username'
                        style={styles.input_control}
                        onChangeText={(text)=>{
                            setusername(text)
                        }}
                        value={username}
                />

                <TextInput
                    autoCapitalize='words'
                    secureTextEntry = {true}
                    placeholder='Enter your password'
                    style={styles.input_control}
                    onChangeText={(text)=>{
                        setpassword(text)
                    }}
                    value={password}
                />
            </View>

            <View style = {styles.button}>
                <Button style = {{backgroundColor : 'red'}} onPress = {()=>{
                        setlogging_text('Logging in . Please wait ...')
                        setlogging_in(true)
                        if (!AppConstants.connected){
                            Administrative.Login(username , password , ()=>{
                                setlogging_in(false)
                                setlogging_text("Welcome back . " + username)
                                props.navigation.navigate("App")
                                
                            },()=>{
                                setlogging_in(false)
                                alert("Either the username or password entered is incorrect.Try again with new parameters")
                            },()=>{
                                setlogging_in(false)
                                alert("An error occured on our side . Contact the system administrator for more information")
                            })
                        }else{
                            alert("You are not connected to the internet")

                        }
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
  );
}

const styles = StyleSheet.create({
    bg_image : {
        height : 0.3 * ScreenHeight,
        width : ScreenWidth,
        alignItems : 'center',
        justifyContent : 'center'
    },
    image : {
        height : 0.3 * ScreenHeight,
        width : 0.5 * ScreenWidth,
    },
    heading : {
        fontFamily: FontFamily.interRegular,
        color: Color.colorBlack,
        fontSize: FontSize.size_5xl,
    },
    subheading : {
        fontFamily: FontFamily.interRegular,
        fontSize : FontSize.size_mini
    },
    headings : {
        width : ScreenWidth,
        height : 0.15 * ScreenHeight,
        justifyContent : 'space-evenly',
        alignItems : 'center'
    },
    inputs : {
        width : ScreenWidth,
        height : 0.3 * ScreenHeight,
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
    button : {
        width : 0.7 * ScreenWidth,
        height : 0.2 * ScreenHeight,
        justifyContent : 'center'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },

})
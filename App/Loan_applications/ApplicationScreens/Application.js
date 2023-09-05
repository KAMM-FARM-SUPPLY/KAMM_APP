import React , {useState , useEffect , useRef} from 'react'
import {View , Text , StyleSheet , ScrollView , FlatList ,BackHandler , Alert  } from 'react-native'
import {Avatar , Button} from 'react-native-elements'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import Separator from '../../Components/Separator'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler'
import SignatureScreen from "react-native-signature-canvas";
import {useDispatch, useSelector} from 'react-redux'
import NumberFormat from 'react-number-format'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DialogInput from 'react-native-dialog-input';

import * as mime from 'react-native-mime-types'




function Application(props) {

  const dispatch = useDispatch()
  const redux_state = useSelector(state => state.Reducer)

 

  const [profile , setprofile] = useState(props.route.params['Profile_info'])
  const [LoanItems , setLoanItems] = useState(redux_state['Loan_app_details'])
  const [current_pic , setCurrent_pic] = useState(null)

  const calculate_total = () => {
    let total = 0;
    for(let i =0 ; i< redux_state['Loan_app_details'].length; i++){
      total += (parseInt(redux_state['Loan_app_details'][i]['Price']) * parseInt(redux_state['Loan_app_details'][i]['Quantity']))
    }
    return String(total)
  }

    
  useEffect(()=>{
    const backAction = () => {
      props.navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  },[redux_state['Loan_app_details']])
  return (
    <View style = {{flexGrow : 1}}>
    <ScrollView contentContainerStyle = {styles.scroll_items} style = {styles.scroll}>
      <View style = {styles.head}>
        <Text style = {styles.head_txt}> Account information</Text>
      </View>
       <View style = {styles.header}>
        <View style={styles.profile_pic}>
            {
                profile ? (
                    <TouchableOpacity onPress = {async ()=>{
                      let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                        if (image.uri){
                            setCurrent_pic(image.uri)
                            
                        } else {
                            console.log("No image")
                        }
                    }}>
                      <Avatar rounded source = {{ uri : (current_pic != null) ? (current_pic) : (profile.Profile_picture)   }} size = {'xlarge'}  />
                    </TouchableOpacity>
                ) : (
                    <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{ name : 'user' , type : 'font-awesome' }} size = {'xlarge'}  />
                )
            }

                
           
        </View>

        <View style = {styles.info}>
            <Text style = {styles.text_info}>Farmer id : #00001</Text>
            <Text style = {styles.text_info}>Name : {profile.Name}</Text>
            <Text style = {styles.text_info}>Gender : {profile.Gender}</Text>
            <Text style = {styles.text_info}>Tel.no : {profile.Phone_number}</Text>
            <Text style = {styles.text_info}>District : {profile.District}</Text>
            <Text style = {styles.text_info}>Subcouty : {profile.Subcounty}</Text>
            <Text style = {styles.text_info}>Village : {profile.Village}</Text>

        </View>

      </View>
      <View style = {styles.LoanHeading}>
        <Text style = {styles.heading}>LOAN DETAILS</Text>
      </View>

      <View style = {styles.LoanView}>
        <Button onPress = {()=>{
          props.navigation.navigate('Categories')
        }} icon={
            <Icon
              style = {{paddingLeft : 10}}
              name="plus"
              size={15}
              color="white"
            />
          }  iconRight title='Add Item'/>

        <View style = {styles.items}>
          <View style = {styles.th}>
            <Text style = {styles.th_font}>Product</Text>
            <Text style = {styles.th_font}>Quantity</Text>
            <Text style = {styles.th_font}>Total</Text>
            <Text style = {styles.th_font}>Delete</Text>

          </View>
          {/* <FlatList
            data = {LoanItems}
            ItemSeparatorComponent={()=> <Separator/>}
            renderItem={(Item , index)=>(
              <View style = {styles.LoanItem}>
                  <Text>{Item.item.Name}</Text>
                  <Text>{Item.item.Quantity} x shs. {Item.item.Price}</Text>
                  <Text>shs.{Item.item.Quantity * Item.item.Price}</Text>
                  <TouchableOpacity>
                    <Avatar icon = {{ name : 'pencil' , type : 'font-awesome', color : '#246EE9' , size : 20 }}  rounded = {true}/>
                  </TouchableOpacity>

              </View>
            )}
          /> */}

          {
            redux_state['Loan_app_details'].map((item ,index , arr)=>(
              <View style = {styles.LoanItem}>
                  <Text>{(item.Name).length >= 7?(item.Name).slice(0,6) + '...' : (item.Name)}</Text>
                  <Text>{item.Quantity} x shs. {item.Price}</Text>
                 
                  <NumberFormat value = { (item.Quantity * item.Price) } displayType = {'text'}
                    thousandSeparator = {true}
                    prefix = {'shs.'}
                    renderText={value => <Text>{value}</Text>}
                  />
                  <TouchableOpacity onPress = {()=>{
                    var new_arr = redux_state.Loan_app_details.map(value => Object.assign({}, value));
                    new_arr.splice(index , 1)
                    dispatch({type : 'Remove_loan_detail' , Details : new_arr})
                  }}>
                    <Avatar size={30} containerStyle = {{backgroundColor : '#246EE9'}} icon = {{ name : 'minus' , type : 'font-awesome', color : 'white' , size : 17 }}  rounded = {true}/>
                  </TouchableOpacity>

              </View>
            ))
          }

        

        </View>
        
        <View style = {styles.overall}>
          <Separator/>
          <NumberFormat value = { calculate_total() } displayType = {'text'}
            thousandSeparator = {true}
            renderText={value => (
              <View style = {styles.Ov_data}>
                  <Text style = {{fontSize : 16,fontWeight : 'bold'}}>Overall Total : shs.{value}</Text>
              </View>
              )
            }
          />
          

        </View>

        <View style = {styles.finalize_btn}>
          <Button containerStyle = {{width : 0.7 * ScreenWidth}} style = {{backgroundColor : 'red'}} onPress = {()=>{
            if (current_pic != null){
              const newImageUri = "file:///" + current_pic.split("file:/").join("")

              let processed_image = {
                  uri : newImageUri,
                  type : mime.lookup(newImageUri),
                  name : newImageUri.split("/").pop()
              }
              dispatch({type : 'Loan_images' , key : 'Active_picture' , value : processed_image})
            } else {
              dispatch({type : 'Loan_images' , key : 'Active_picture' , value : null})
            }
            
            
            props.navigation.navigate('Collateral')
          }} icon={
              <Icon
                style = {{paddingLeft : 10}}
                name="arrow-right"
                size={15}
                color="white"
              />
            }  iconRight title='NEXT'/>

        </View>
        
        

      </View>

      
    </ScrollView>
    </View>
    
  )
}

export default Application

const styles = StyleSheet.create({

  scroll : {
    // flex : 1,
  },
  scroll_items : {
      alignItems : 'center',
      justifyContent : 'space-around',
      // flex : 1,
  },
  header : {
      flexDirection : 'row',
      height : 0.4 * ScreenHeight ,
      width : ScreenWidth,
      justifyContent : 'space-around',
      alignItems : 'center',
  },
  profile_pic : {
      height : 0.4 * ScreenHeight,
      width : 0.5 * ScreenWidth,
      justifyContent : 'center',
      alignItems : 'center',
  },
  info : {
      height : 0.4 * ScreenHeight,
      width : 0.5 * ScreenWidth,
      justifyContent : 'space-around',
      alignItems : 'flex-start',
  },
  text_info : {
      fontSize : 15,
      fontWeight : 'normal',
  } ,
  LoanView : {
    // height : 0.9 * ScreenHeight,
    width : 0.95 * ScreenWidth,
    // backgroundColor : 'red'
  },

  LoanHeading : {
    height : 50,
    width : 0.9 * ScreenWidth,
    justifyContent : 'center',
    alignItems : 'center'
  },
  heading : {
    fontSize : 15,
    fontWeight : 'bold',
  },
  items : {
    top : 20,
    // backgroundColor : 'red',
    flex : 1,
  },
  LoanItem : {
    height : 50,
    width : ScreenWidth,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around'
  },
  th : {
    width : ScreenWidth,
    height : 40,
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center'
  },
  th_font : {
    fontSize : 13,
    fontWeight : 'bold',
  },
  overall : {
    top : 20,
    height : 0.15 * ScreenHeight,
    width : 0.95 * ScreenWidth,

    // justifyContent : 'space-around',
    // alignItems : 'flex-end',
  },
  Ov_data : {
    height : 0.1 * ScreenHeight,
    width : 0.95 * ScreenWidth,
    alignItems : 'flex-end',
    justifyContent : 'space-around'
  },
  signature : {
    height : 0.5 * ScreenHeight,
    width : ScreenWidth,
    // backgroundColor : 'red'
  },
  finalize_btn : {
    height : 0.1 * ScreenHeight,
    width : ScreenWidth,
    justifyContent : 'center',
    alignItems : 'center',
  },
  head : {
    height : 0.08 * ScreenHeight ,
    width : ScreenWidth,
    justifyContent : 'center',
    alignItems : 'center',
  },
  head_txt : {
    fontSize : 15,
    fontWeight : 'bold',
  }

})
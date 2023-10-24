import React , {useState , useEffect , useRef} from 'react'
import {View , Text , Image ,  StyleSheet , ScrollView , FlatList ,BackHandler , Alert , ActivityIndicator } from 'react-native'
import {Avatar , Button } from 'react-native-elements'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import Separator from '../Components/Separator'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler'
import SignatureScreen from "react-native-signature-canvas";
import {useDispatch, useSelector} from 'react-redux'
import NumberFormat from 'react-number-format'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DialogInput from 'react-native-dialog-input';
import axios from 'axios'
import AppConstants from '../Constants/AppConstants'
import Modal from "react-native-modal";
// import { createOpenLink } from 'react-native-open-maps';
import openMap from 'react-native-open-maps';

function ApplicationProfile(props) {

  const [profile , setprofile] = useState(null)

  const [farmer_info_loaded , setfarmer_info_loaded] = useState(false)
  const [product_info_loaded , setproduct_info_loaded] = useState(false)
  const [farmer_info , setfarmer_info] = useState(null)
  const [Current_products , setCurrent_products] = useState(null)

  const [KinmodalVisible, setKinModalVisible] = useState(false);


  const [CollateralmodalVisible , setCollateralmodalVisible] = useState(false)
  const [activeCollateral , setactiveCollateral] = useState(null)




  const fetch_user_info = (url) => {
    axios({
      method : 'GET',
      url : url,
    }).then((Response)=>{
      if (Response.status == 200){
        setfarmer_info(Response.data)
        setfarmer_info_loaded(true)
      }
    })
  }


  const fetch_product_info_current = (ids) => {
    axios({
      method : 'POST',
      url : AppConstants.Debug ? (AppConstants.debug_url + '/getproducts_app') : (AppConstants.live_url + '/getproducts_app'),
      data : {ids : ids}
    }).then((Response)=>{
      if (Response.status == 200){
        setCurrent_products(Response.data)
        setproduct_info_loaded(true)
      }
    })
  }


  const getproduct_info = (id) => {
    for(let i=0; i<Current_products.length; i++){
      if (id == Current_products[i].id){
        return Current_products[i]
      }
    }
  }


  useEffect(()=>{
    console.log(props.route.params['Profile_info'])
    setprofile(props.route.params['Profile_info'])

    fetch_user_info(props.route.params['Profile_info'].farmer)

    var ids = []
    for(let i =0; i <props.route.params['Profile_info'].Products.length; i++){
      ids.push(props.route.params['Profile_info'].Products[i].product)
    }
    fetch_product_info_current(ids)


    if (props.route.params['registration']){
      const backAction = () => {
          props.navigation.navigate('Overview')
          return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }

  },[])


  if (!farmer_info_loaded || !product_info_loaded){
    return (
      <View style = {styles.Indicator}>
          <ActivityIndicator/>
          <Text>Loading Application information...</Text>
      </View>
    )
  } else {
    console.log(profile)
    return (
      <View style = {{flexGrow : 1}}>
      <ScrollView contentContainerStyle = {styles.scroll_items} style = {styles.scroll}>
        <View style = {styles.head}>
          <Text style = {styles.head_txt}> Account information</Text>
        </View>
         <View style = {styles.header}>
          <View style={styles.profile_pic}>
              
                      <TouchableOpacity onPress = {async ()=>{
                        
                      }}>
  
                        {(profile.Active_picture != null)? (
                          <Avatar rounded source = {{uri : profile.Active_picture}}  size = {'xlarge'}  />
                        ) : (
                          <Avatar rounded source = {require('../../assets/user_default.jpg')}  size = {'xlarge'}  />
                        )}
  
                      </TouchableOpacity>
                
  
          </View>
  
          <View style = {styles.info}>
              <Text style = {styles.text_info}>Farmer id : #00001</Text>
              <Text style = {styles.text_info}>Name : {farmer_info.Name}</Text>
              <Text style = {styles.text_info}>Gender : {farmer_info.Gender}</Text>
              <Text style = {styles.text_info}>Tel.no : {farmer_info.Phone_number}</Text>
              <Text style = {styles.text_info}>District : {farmer_info.District}</Text>
              <Text style = {styles.text_info}>Subcouty : {farmer_info.Subcounty}</Text>
              <Text style = {styles.text_info}>Village : {farmer_info.Village}</Text>
              <Text style = {styles.text_info}>Date issued : {new Date(farmer_info.Date_added).toLocaleDateString()}</Text>

  
          </View>
  
        </View>
        <View style = {styles.LoanHeading}>
          <Text style = {styles.heading}>LOAN DETAILS</Text>
        </View>
  
        <View style = {styles.LoanView}>
          
  
          <View style = {styles.items}>
            <View style = {styles.th}>
              <Text style = {styles.th_font}>Product</Text>
              <Text style = {styles.th_font}>Quantity</Text>
              <Text style = {styles.th_font}>Total</Text>
  
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
              profile.Products.map((item ,index , arr)=>{
                let product_info = getproduct_info(item.product)
                //console.log(product_info)
                return(
                <View style = {styles.LoanItem}>
                    <Text>{product_info['name'].length >= 7?product_info['name'].slice(0,6) + '...' : product_info['name']}</Text>
                    <Text>{item.quantity} x shs. {item.rate}</Text>
                   
                    <NumberFormat value = { (item.quantity * item.rate) } displayType = {'text'}
                      thousandSeparator = {true}
                      prefix = {'shs.'}
                      renderText={value => <Text>{value}</Text>}
                    />
                    
  
                </View>
              )})
            }
  
          
  
          </View>
          
          <View style = {styles.overall}>
            <Separator/>
            <NumberFormat value = { profile.Total_cost } displayType = {'text'}
              thousandSeparator = {true}
              renderText={value => (
                <View style = {styles.Ov_data}>
                    <Text style = {{fontSize : 16,fontWeight : 'bold'}}>Overall Total : shs.{value}</Text>
                </View>
                )
              }
            />
          </View>
  
         
          
          
  
        </View>

        <View style = {styles.LoanHeading}>
          <Text style = {styles.heading}>NEXT OF KINS</Text>
        </View>
          
        <TouchableOpacity onPress={()=>{setKinModalVisible(true)} } style = {styles.Kin}>
              <View style = {styles.thumbnail}>
                <Avatar rounded source = {{ uri : profile.Next_of_kin[0].image }} size = {'medium'}  />
                <View style = {styles.Name}>
                  <Text style = {{fontSize : 15 , fontWeight : 'bold'}} >{profile.Next_of_kin[0].surname + ' ' + profile.Next_of_kin[0].given_name}</Text>
                  <Text style = {{fontSize : 12}}>{profile.Next_of_kin[0].telephone_number}</Text>
                  <Text style = {{fontSize : 12}}>{profile.Next_of_kin[0].nin_number}</Text>
                </View>
              </View>
              <View>
                <Avatar rounded source = {{ uri : profile.Next_of_kin[0].signature }} size = {'medium'}  />
              </View>
        </TouchableOpacity>

        <View style = {styles.LoanHeading}>
          <Text style = {styles.heading}>COLLATERAL</Text>
        </View>
          

        <FlatList
          style = {{width : ScreenWidth , height : 0.2 * ScreenHeight}}
          data = {profile.Collateral} 
          horizontal = {true}
          ListEmptyComponent = {
              () => (
                  <Text style = {{
                      fontSize : 17
                  }}>No Collateral information found</Text>
              )
          }
          alwaysBounceHorizontal = {true}
          showsHorizontalScrollIndicator = {false}
          contentContainerStyle = {styles.list_c}
          renderItem = {
              (item,index) => (
                  <TouchableOpacity style = {styles.item_c} onPress = {
                      () => {
                        setactiveCollateral(item.item)
                        setCollateralmodalVisible(true)
                      }
                  }>
                      <View style = {{width : 60 , height : 60 , justifyContent : 'center' , alignItems : 'center', elevation : 5 , backgroundColor : 'white', borderRadius : 30}}>
                      
                      <Avatar rounded containerStyle = {{elevation : 5,}} source = {{uri : item.item.collateral_image}} size = {'medium'}/>
                      </View>
                          <Text style = {{fontWeight : '600', color : 'black'}}> { (item.item.description).length > 7 ? ((item.item.description).slice(0,7) + '...')
                          :(item.item.description) } </Text>
                  </TouchableOpacity>
              )
          } 
            />

        <View style = {styles.LoanHeading}>
          <Text style = {styles.heading}> LC1 QUALIFICATION </Text>
        </View>
        <TouchableOpacity style = {styles.LC1}>
           <View style = {styles.thumbnail}>
                <Avatar rounded source = {{ uri : profile.LC1_letter }} size = {'medium'}  />
                <View style = {styles.Name}>
                   <Text>LC1 letter</Text>
                   <Avatar rounded icon = {{ name : 'check' , size : 18 , color : 'green'  }} />
                </View>
              </View>
              <View>
                <Avatar rounded icon = {{ name : 'envelope-open' , size : 18 , color : 'green', type: 'font-awesome' }} size = {'medium'}  />
              </View>
        </TouchableOpacity>

      </ScrollView>

      <Modal style = {{alignItems : 'center' }} isVisible = {KinmodalVisible}>

        <View style = {{
          width : 0.95 * ScreenWidth,
          height : 0.8 * ScreenHeight,
          justifyContent : 'space-around',
          alignItems : 'center',
        }}>
          <Image source={{uri : profile['Next_of_kin'][0]['front_side_id']}} style = {{height : 0.3 * ScreenHeight, width : 0.85 * ScreenWidth}} />
          <Image source={{uri : profile['Next_of_kin'][0]['back_side_id']}} style = {{height : 0.3 * ScreenHeight, width : 0.85 * ScreenWidth}} />
          <View style = {{ width : 0.6 * ScreenWidth , height : 50 }}>
            <Button title="Close" onPress={()=>{setKinModalVisible(false)}} />
          </View>
        </View>


          
          
          
      </Modal>

      {(activeCollateral != null) ? (
        <Modal style = {{ alignItems : 'center' , justifyContent : 'flex-end' }} isVisible = {CollateralmodalVisible} >
        
        <View style = {{width : ScreenWidth , height : 0.7 * ScreenHeight , backgroundColor : 'white' , alignItems : 'center' , justifyContent : 'space-between'}}>
          <View style = {styles.Coll_image}>
            <View style = {{
              width : 0.98 * ScreenWidth,
              height : 50,
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center',
            }}>
              <Text style = {{fontSize : 16 , fontWeight : 'bold'}}>Image </Text>

              <Avatar onPress={()=>{setCollateralmodalVisible(false)}} rounded icon = {{ name : 'times' , size : 18 , color : 'green', type: 'font-awesome' }} size = {'medium'}  />
            </View>
            <Image source={{uri : activeCollateral.collateral_image}} style = {{height : 0.3 * ScreenHeight, width : 0.95 * ScreenWidth}} />

          </View>

          <View style = {{...styles.Coll_image ,height : 0.2 * ScreenHeight , justifyContent : 'space-evenly'}}>
            <View style = {{
              width : 0.93 * ScreenWidth,
              height : 50,
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center',
            }}>
              <Text style = {{fontSize : 16 , fontWeight : 'bold'}}>Description </Text>
              <Avatar rounded icon = {{ name : 'pencil' , size : 18 , color : 'green', type: 'font-awesome' }} size = {'medium'}  />
            </View>
              <Text>1. {activeCollateral.description}</Text>
          </View>
          <View style = {{width : ScreenWidth  }}>
          <Button onPress = {()=>{
            openMap({
              latitude: parseInt(activeCollateral.latitude), 
              longitude: parseInt(activeCollateral.longitude),
              provider : 'google',
              travelType : 'drive',
              zoom : 40,

            })
            // openMap({ latitude: 37.865101, longitude: -119.538330 });
          }} icon={
            <Icon
              style = {{paddingLeft : 10}}
              name="map-marker"
              size={15}
              color="white"
            />} iconRight title='OPEN LOCATION' />
          </View>
          

          {/* <TouchableOpacity style = {styles.location_btn}>
              <Text style = {{
                color : '#4169E1',
                fontSize : 18
              }}>OPEN LOCATION</Text>
              <Avatar rounded icon = {{ name : 'map-marker' , size : 18 , color : 'green', type: 'font-awesome' }} size = {'medium'}  />
          </TouchableOpacity> */}

        </View>

      </Modal>
      ) : (<View/>)}

      

      </View>
    )
  }

  
}

export default ApplicationProfile

const styles = StyleSheet.create({

  scroll : {
    // flex : 1,
  },
  location_btn : {
    width : ScreenWidth ,
    height : 60,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around',
    //borderWidth : 1

  },
  Coll_image : {
    width : 0.95 * ScreenWidth,
    height : 0.4 * ScreenHeight,
    justifyContent : 'space-around'
  },
  LC1 : {
    width : 0.95 * ScreenWidth,
    height : 0.1 * ScreenHeight,
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center'
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
  item_c : {
    flexDirection : 'column',
    justifyContent : 'space-between',
    alignItems : 'center',
    paddingLeft: 14,
    paddingRight : 14,
    
  },
  list_c : {
      height : 0.13 * ScreenHeight,
      top : 10,
      
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
    fontSize : 17,
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
    fontSize : 17,
    fontWeight : 'bold',
  },
  Indicator : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  Kin : {
    width : 0.95 * ScreenWidth,
    height : 0.18 * ScreenHeight,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    //backgroundColor : 'red'
  },
  thumbnail : {
    width : 0.72 * ScreenWidth,
    height : 0.12 * ScreenHeight,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around',

  },
  Name : {
    width : 0.55 * ScreenWidth,
    height : 60,
    
  },

})
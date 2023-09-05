import React , {useState , useEffect} from 'react'
import {View , Text , StyleSheet , ScrollView , Button , Image , TouchableHighlight} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import GeoLocation from '../../Helpers/GeoLocation';
import {useDispatch, useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogInput from 'react-native-dialog-input';
import Spinner from 'react-native-loading-spinner-overlay'
import * as Location from 'expo-location';
import * as mime from 'react-native-mime-types'




function Collateral(props) {

    const [Letter , setLetter] = useState(null)
    const [Action , setAction] = useState(false)

    const [Pic_1 , setPic_1] = useState(null)
    const [Pic_2 , setPic_2] = useState(null)
    const [Pic_3 , setPic_3] = useState(null)
    const [Pic_4 , setPic_4] = useState(null)
    const [Pic_5 , setPic_5] = useState(null)
    const [Pic_6 , setPic_6] = useState(null)

    const [visible, setVisible] = useState(false);
    const [Active_pic , setActive_pic] = useState(null);

    const [currentLongitude,setCurrentLongitude] = useState('...');
    const [currentLatitude, setCurrentLatitude] = useState('...');
    const [locationStatus, setLocationStatus] = useState('');

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [active_text , setactive_text] = useState(null)
    const [Spin , setSpin] = useState(false)

    const dispatch = useDispatch()
    const redux_state = useSelector(state => state.Reducer)

    useEffect(()=>{
        (async () => {
      
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            // await GetLocation()
          })();
    },[])

    const GetLocation = async() => {
        setactive_text("Updating index information...")
        setSpin(true)
        setTimeout(async ()=>{
            setactive_text("Localizing Location index info...")
            setTimeout(async ()=>{
                console.log('here')
                let location = await Location.getCurrentPositionAsync({
                    accuracy : Location.Accuracy.BestForNavigation,
                    mayShowUserSettingsDialog : true
                });
                setactive_text("The latitude is " + location.coords.latitude + " and longitude is " + location.coords.longitude)
                setTimeout(()=>{
                    setSpin(false)
                    if(Active_pic == 1){
                        setPic_1({...Pic_1 , location : location})
                        console.log('Pic 1')
                    }else if (Active_pic == 2){
                        setPic_2({...Pic_2 , location : location})

                    } else if (Active_pic == 3){
                        setPic_3({...Pic_3 , location : location})

                    } else if (Active_pic == 4){
                        setPic_4({...Pic_4 , location : location})

                    } else if (Active_pic == 5){
                        setPic_5({...Pic_5 , location : location})

                    } else if (Active_pic == 6){
                        setPic_6({...Pic_6 , location : location})
                    }
                },1500)
                
            },2500)
            setTimeout(()=>{
                setSpin(false)
            },10000)
            
        },2000)
       
    }

    const store_redux_data = () => {
        // Working on the LC1 office letter
        if (Letter != null){
            const newImageUri = "file:///" + Letter.split("file:/").join("")

            let processed_letter = {
                uri : newImageUri,
                type : mime.lookup(newImageUri),
                name : newImageUri.split("/").pop()
            }
            dispatch({type : 'Loan_images' , key : 'LC1_letter' , value: processed_letter })
        }else {
            dispatch({type : 'Loan_images' , key : 'LC1_letter' , value : null })
        }
        

        // Working on the six collaterals 
        for(let i=1; i <= 6; i++){
            if (get_index(i) != null ){
                let Collateral = get_index(i)

                //Working on the picture 
                const col_image_uri = "file:///" + Collateral.Image.split("file:/").join("")

                let processed_image = {
                    uri : col_image_uri,
                    type : mime.lookup(col_image_uri),
                    name : col_image_uri.split("/").pop()
                }

                //Getting the description
                let description = Collateral['description'] ? (Collateral['description']) : ''

                //Getting the location
                let Latitude = Collateral['location'] ? Collateral['location'].coords.latitude : ''
                let Longitude = Collateral['location'] ? Collateral['location'].coords.longitude : ''
                
                

                dispatch({
                    type : 'Loan_app_collateral',
                    key : 'Collateral_' + i,
                    value : {
                        'description' : description,
                        'latitude' : Latitude,
                        'longitude' : Longitude,
                    }
                })

                //Storing the image
                dispatch({type : 'Loan_images' , key : 'Collateral_' + i , value : processed_image})
            }
        }

        
    }

    const get_index = (index) => {
        if (index == 1){
            return Pic_1
        } else if (index == 2){
            return Pic_2

        } else if (index == 3){
            return Pic_3

        } else if (index == 4){
            return Pic_4

        } else if (index == 5){
            return Pic_5

        } else if (index == 6){
            return Pic_6

        } else {
            return null
        }
    }

    return (
        <View style = {{flexGrow : 1}}>
            <Spinner
                visible={Spin}
                textContent={active_text}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView  contentContainerStyle = {styles.container}>
                <Text style = {styles.heading}>LC1 Office Letter</Text>
                <View style = {styles.letter}>

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
                                setLetter(result.uri)
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
                        {(Letter != null)? (
                                <Image source = {{uri : Letter}} style = {styles.pic} />
                            ) : (
                                <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'file-text' , type : 'font-awesome' }} size = {'xlarge'}  />
                            )}
                    

                <View style = {styles.cam_icon}>
                    <TouchableOpacity onPress = {
                    async () => {
                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                        if (image.uri){
                            setLetter(image.uri)
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

                <Text style = {styles.heading}>Collateral Images</Text>
                {/* <View style = {styles.collateral_images}>
                    <TouchableOpacity style = {styles.CP}>

                    </TouchableOpacity>
                
                </View> */}
                <DialogInput 
                isDialogVisible={visible}
                title={"Short Description"}
                message={"Enter the description for the uploaded Collateral image"}
                hintInput ={"Description "}
                submitInput={ (inputText) => {
                    setVisible(false)
                    console.log(Active_pic)
                    if(Active_pic == 1){
                        setPic_1({...Pic_1 , description : inputText})

                    }else if (Active_pic == 2){
                        setPic_2({...Pic_2 , description : inputText})

                    } else if (Active_pic == 3){
                        setPic_3({...Pic_3 , description : inputText})

                    } else if (Active_pic == 4){
                        setPic_4({...Pic_4 , description : inputText})

                    } else if (Active_pic == 5){
                        setPic_5({...Pic_5 , description : inputText})

                    } else if (Active_pic == 6){
                        setPic_6({...Pic_6 , description : inputText})
                    }
                    
                }}
                closeDialog={() => setVisible(false)}>
            </DialogInput>

                <ScrollView horizontal = {true} style = {{width : ScreenWidth , Height : 0.4 * ScreenHeight, top : 20}} contentContainerStyle = {styles.collateral_images}>
                    <TouchableOpacity onPress = {async ()=>{
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
                                setPic_1({Image : result.uri , description : '' })
                                setTimeout(()=>{
                                    setAction(true)
                                } , 100)
                            }
                            } catch (E) {
                            console.log(E);
                            }} else {
                                console.log("No permissions")
                            }
                    }} style = {styles.CP}>
                            {(Pic_1 != null)?(
                                <Image source = {{uri : Pic_1.Image}} style = {styles.CP_Image} />
                            ):(
                                <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'cubes' , type : 'font-awesome' }} size = {'xlarge'}  />
                            )}

                            {(Pic_1 != null)?(
                                <View style = {styles.description_collateral_icons}>
                                    <TouchableOpacity onPress={()=>{
                                        setActive_pic(1)
                                        setVisible(true)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : Pic_1.description ? ('green') : ('white')  }} icon = {{ name : 'pencil' , type : 'font-awesome', color : Pic_1.description ? ('white') : ('black')   }} rounded = {true}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(1)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images })
                                        if (image.uri){
                                            setPic_1({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                            }
                                        } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_1.Image ? ('green') : ('white')  }} icon = {{  name : 'camera' , color : Pic_1.Image ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {async () => {
                                            setActive_pic(1)
                                            await GetLocation()
                                        }
                                    } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_1.location ? ('green') : ('white')   }} icon = {{  name : 'map-marker' , color : Pic_1.location ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {()=>{
                                        setActive_pic(1)
                                        setPic_1(null)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : 'white' }} icon = {{ name : 'minus' , type : 'font-awesome', color : 'black'  }} rounded = {true}/>
                                    </TouchableOpacity>

                                </View>

                            ):(
                                <View/>
                            )}

                            {(Pic_1 != null)?(
                                <View style = {styles.description}>
                                    <Text style = {styles.descript_text}>{(Pic_1.description)?(Pic_1.description):("No description added yet")}</Text>
                                </View>
                            ):(
                                <View/>
                            )}

                            {(Pic_1 == null)?(
                                <View style = {styles.cam_icon_Collateral}>
                                <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(1)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_1({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                    }
                                } >
                                <Avatar rounded containerStyle = {{ backgroundColor : 'white'   }} icon = {{  name : 'camera' , color : '#246EE9', type : 'font-awesome' }} size = {'medium'} />
                            </TouchableOpacity>
                        </View>  
                            ):(
                                <View/>
                            )}

                        

                    </TouchableOpacity>
                    <TouchableOpacity onPress = {async ()=>{
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
                                setPic_2({Image : result.uri , description : ''})
                                setTimeout(()=>{
                                    setAction(true)
                                } , 100)
                            }
                            } catch (E) {
                            console.log(E);
                            }} else {
                                console.log("No permissions")
                            }
                    }} style = {styles.CP}>

                    {(Pic_2 != null)?(
                                <Image source = {{uri : Pic_2.Image}} style = {styles.CP_Image} />
                            ):(
                                <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'cubes' , type : 'font-awesome' }} size = {'xlarge'}  />
                            )}

                            {(Pic_2 != null)?(
                                <View style = {styles.description_collateral_icons}>
                                    <TouchableOpacity onPress={()=>{
                                        setActive_pic(2)
                                        setVisible(true)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : Pic_2.description ? ('green') : ('white')  }} icon = {{ name : 'pencil' , type : 'font-awesome', color : Pic_2.description ? ('white') : ('black')   }} rounded = {true}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(2)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_2({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                            }
                                        } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_2.Image ? ('green') : ('white')  }} icon = {{  name : 'camera' , color : Pic_2.Image ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>   

                                     <TouchableOpacity onPress = {async () => {
                                            setActive_pic(2)
                                            await GetLocation()
                                        }
                                    } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_2.location ? ('green') : ('white')   }} icon = {{  name : 'map-marker' , color : Pic_2.location ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>     

                                    <TouchableOpacity onPress = {()=>{
                                        setActive_pic(1)
                                        setPic_2(null)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : 'white' }} icon = {{ name : 'minus' , type : 'font-awesome', color : 'black'  }} rounded = {true}/>
                                    </TouchableOpacity>

                                </View>

                            ):(
                                <View/>
                            )}

                            {(Pic_2 != null)?(
                                <View style = {styles.description}>
                                    <Text style = {styles.descript_text}>{(Pic_2.description)?(Pic_2.description):("No description added yet")}</Text>
                                </View>
                            ):(
                                <View/>
                            )}

                            {(Pic_2 == null)?(
                                <View style = {styles.cam_icon_Collateral}>
                                <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(2)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_2({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                    }
                                } >
                                <Avatar rounded containerStyle = {{ backgroundColor : 'white'   }} icon = {{  name : 'camera' , color : '#246EE9', type : 'font-awesome' }} size = {'medium'} />
                            </TouchableOpacity>
                        </View>  
                            ):(
                                <View/>
                            )}

                        

                    </TouchableOpacity>
                    <TouchableOpacity onPress = {async ()=>{
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
                                setPic_3({Image : result.uri , description : ''})
                                setTimeout(()=>{
                                    setAction(true)
                                } , 100)
                            }
                            } catch (E) {
                            console.log(E);
                            }} else {
                                console.log("No permissions")
                            }
                    }} style = {styles.CP}>

                    {(Pic_3 != null)?(
                                <Image source = {{uri : Pic_3.Image}} style = {styles.CP_Image} />
                            ):(
                                <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'cubes' , type : 'font-awesome' }} size = {'xlarge'}  />
                            )}

                            {(Pic_3 != null)?(
                                <View style = {styles.description_collateral_icons}>
                                    <TouchableOpacity onPress={()=>{
                                        setActive_pic(3)
                                        setVisible(true)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : Pic_3.description ? ('green') : ('white')  }} icon = {{ name : 'pencil' , type : 'font-awesome', color : Pic_3.description ? ('white') : ('black')   }} rounded = {true}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(3)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_3({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                            }
                                        } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_3.Image ? ('green') : ('white')  }} icon = {{  name : 'camera' , color : Pic_3.Image ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {async () => {
                                            setActive_pic(3)
                                            await GetLocation()
                                        }
                                    } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_3.location ? ('green') : ('white')   }} icon = {{  name : 'map-marker' , color : Pic_3.location ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {()=>{
                                        setActive_pic(3)
                                        setPic_1(null)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : 'white' }} icon = {{ name : 'minus' , type : 'font-awesome', color : 'black'  }} rounded = {true}/>
                                    </TouchableOpacity>

                                </View>

                            ):(
                                <View/>
                            )}

                            {(Pic_3 != null)?(
                                <View style = {styles.description}>
                                    <Text style = {styles.descript_text}>{(Pic_3.description)?(Pic_3.description):("No description added yet")}</Text>
                                </View>
                            ):(
                                <View/>
                            )}

                            {(Pic_3 == null)?(
                                <View style = {styles.cam_icon_Collateral}>
                                <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(3)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_3({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                    }
                                } >
                                <Avatar rounded containerStyle = {{ backgroundColor : 'white'   }} icon = {{  name : 'camera' , color : '#246EE9', type : 'font-awesome' }} size = {'medium'} />
                            </TouchableOpacity>
                        </View>  
                            ):(
                                <View/>
                            )}

                        

                    </TouchableOpacity>
                    <TouchableOpacity onPress = {async ()=>{
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
                                setPic_4({Image : result.uri , description : ''})
                                setTimeout(()=>{
                                    setAction(true)
                                } , 100)
                            }
                            } catch (E) {
                            console.log(E);
                            }} else {
                                console.log("No permissions")
                            }
                    }} style = {styles.CP}>

                    {(Pic_4 != null)?(
                                <Image source = {{uri : Pic_4.Image}} style = {styles.CP_Image} />
                            ):(
                                <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'cubes' , type : 'font-awesome' }} size = {'xlarge'}  />
                            )}

                            {(Pic_4 != null)?(
                                <View style = {styles.description_collateral_icons}>
                                    <TouchableOpacity onPress={()=>{
                                        setActive_pic(4)
                                        setVisible(true)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : Pic_4.description ? ('green') : ('white')  }} icon = {{ name : 'pencil' , type : 'font-awesome', color : Pic_4.description ? ('white') : ('black')   }} rounded = {true}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(4)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_4({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                            }
                                        } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_4.Image ? ('green') : ('white')  }} icon = {{  name : 'camera' , color : Pic_4.Image ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {async () => {
                                            setActive_pic(4)
                                            await GetLocation()
                                        }
                                    } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_4.location ? ('green') : ('white')}} icon = {{  name : 'map-marker' , color : Pic_4.location ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {()=>{
                                        setActive_pic(4)
                                        setPic_4(null)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : 'white' }} icon = {{ name : 'minus' , type : 'font-awesome', color : 'black'  }} rounded = {true}/>
                                    </TouchableOpacity>

                                </View>

                            ):(
                                <View/>
                            )}

                            {(Pic_4 != null)?(
                                <View style = {styles.description}>
                                    <Text style = {styles.descript_text}>{(Pic_4.description)?(Pic_4.description):("No description added yet")}</Text>
                                </View>
                            ):(
                                <View/>
                            )}

                            {(Pic_4 == null)?(
                                <View style = {styles.cam_icon_Collateral}>
                                <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(4)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_4({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                    }
                                } >
                                <Avatar rounded containerStyle = {{ backgroundColor : 'white'   }} icon = {{  name : 'camera' , color : '#246EE9', type : 'font-awesome' }} size = {'medium'} />
                            </TouchableOpacity>
                        </View>  
                            ):(
                                <View/>
                            )}

                        

                    </TouchableOpacity>
                    <TouchableOpacity onPress = {async ()=>{
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
                                setPic_5({Image : result.uri , description : ''})
                                setTimeout(()=>{
                                    setAction(true)
                                } , 100)
                            }
                            } catch (E) {
                            console.log(E);
                            }} else {
                                console.log("No permissions")
                            }
                    }} style = {styles.CP}>

                    {(Pic_5 != null)?(
                                <Image source = {{uri : Pic_5.Image}} style = {styles.CP_Image} />
                            ):(
                                <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'cubes' , type : 'font-awesome' }} size = {'xlarge'}  />
                            )}

                            {(Pic_5 != null)?(
                                <View style = {styles.description_collateral_icons}>
                                    <TouchableOpacity onPress={()=>{
                                        setActive_pic(5)
                                        setVisible(true)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : Pic_5.description ? ('green') : ('white')  }} icon = {{ name : 'pencil' , type : 'font-awesome', color : Pic_5.description ? ('white') : ('black')   }} rounded = {true}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(5)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_5({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                            }
                                        } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_5.Image ? ('green') : ('white')  }} icon = {{  name : 'camera' , color : Pic_5.Image ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {async () => {
                                            setActive_pic(5)
                                            await GetLocation()
                                        }
                                    } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_5.location ? ('green') : ('white')   }} icon = {{  name : 'map-marker' , color : Pic_5.location ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {()=>{
                                        setActive_pic(5)
                                        setPic_5(null)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : 'white' }} icon = {{ name : 'minus' , type : 'font-awesome', color : 'black'  }} rounded = {true}/>
                                    </TouchableOpacity>

                                </View>

                            ):(
                                <View/>
                            )}

                            {(Pic_5 != null)?(
                                <View style = {styles.description}>
                                    <Text style = {styles.descript_text}>{(Pic_5.description)?(Pic_5.description):("No description added yet")}</Text>
                                </View>
                            ):(
                                <View/>
                            )}

                            {(Pic_5 == null)?(
                                <View style = {styles.cam_icon_Collateral}>
                                <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(5)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_5({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                    }
                                } >
                                <Avatar rounded containerStyle = {{ backgroundColor : 'white'   }} icon = {{  name : 'camera' , color : '#246EE9', type : 'font-awesome' }} size = {'medium'} />
                            </TouchableOpacity>
                        </View>  
                            ):(
                                <View/>
                            )}

                        

                    </TouchableOpacity>
                    <TouchableOpacity onPress = {async ()=>{
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
                                setPic_6({Image : result.uri , description : ''})
                                setTimeout(()=>{
                                    setAction(true)
                                } , 100)
                            }
                            } catch (E) {
                            console.log(E);
                            }} else {
                                console.log("No permissions")
                            }
                    }} style = {styles.CP}>

                        {(Pic_6 != null)?(
                                <Image source = {{uri : Pic_6.Image}} style = {styles.CP_Image} />
                            ):(
                                <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'cubes' , type : 'font-awesome' }} size = {'xlarge'}  />
                            )}

                            {(Pic_6 != null)?(
                                <View style = {styles.description_collateral_icons}>
                                    <TouchableOpacity onPress={()=>{
                                        setActive_pic(6)
                                        setVisible(true)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : Pic_6.description ? ('green') : ('white')  }} icon = {{ name : 'pencil' , type : 'font-awesome', color : Pic_6.description ? ('white') : ('black')   }} rounded = {true}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(6)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_6({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                            }
                                        } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : 'white'   }} icon = {{  name : 'camera' , color : 'black', type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {async () => {
                                            setActive_pic(6)
                                            await GetLocation()
                                        }
                                    } >
                                        <Avatar rounded containerStyle = {{ backgroundColor : Pic_6.location ? ('green') : ('white')   }} icon = {{  name : 'map-marker' , color : Pic_6.location ? ('white') : ('black'), type : 'font-awesome' }} size = {'small'} />
                                    </TouchableOpacity>    

                                    <TouchableOpacity onPress = {()=>{
                                        setActive_pic(6)
                                        setPic_6(null)
                                    }}>
                                        <Avatar size="small" containerStyle = {{ backgroundColor : 'white' }} icon = {{ name : 'minus' , type : 'font-awesome', color : 'black'  }} rounded = {true}/>
                                    </TouchableOpacity>

                                </View>

                            ):(
                                <View/>
                            )}

                            {(Pic_6 != null)?(
                                <View style = {styles.description}>
                                    <Text style = {styles.descript_text}>{(Pic_6.description)?(Pic_6.description):("No description added yet")}</Text>
                                </View>
                            ):(
                                <View/>
                            )}

                            {(Pic_6 == null)?(
                                <View style = {styles.cam_icon_Collateral}>
                                <TouchableOpacity onPress = {
                                    async () => {
                                        setActive_pic(6)
                                        let image = await ImagePicker.launchCameraAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images , allowsEditing : true , aspect : [4,3] , quality : 0.8 , base64 : true})
                                        if (image.uri){
                                            setPic_6({Image : image.uri , description : ''})
                                            setTimeout(()=>{
                                                setAction(true)
                                            } , 100)
                                        } else {
                                            console.log("No image")
                                        }
                                    }
                                } >
                                <Avatar rounded containerStyle = {{ backgroundColor : 'white'   }} icon = {{  name : 'camera' , color : '#246EE9', type : 'font-awesome' }} size = {'medium'} />
                            </TouchableOpacity>
                        </View>  
                            ):(
                                <View/>
                            )}

                        

                    </TouchableOpacity>
                    

                </ScrollView>
                <View style = {{height : 100 , width : 0.6 * ScreenWidth , top : 50}}>
                <Button containerStyle = {{width : 0.7 * ScreenWidth}} style = {{backgroundColor : 'red'}} onPress = {()=>{
                    store_redux_data()
                    console.log(redux_state['Loan_identity'])
                    props.navigation.navigate('Next of Kin')
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
        </View>
    
  )
}

export default Collateral

const styles = StyleSheet.create({
    container : {
        // flex : 1,
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    heading : {
        fontSize : 17,
        fontWeight : 'bold',
    },
    letter : {
        height : 0.4 * ScreenHeight,
        width : ScreenWidth,
        // backgroundColor : 'red',
        justifyContent : 'center',
        alignItems : 'center'
    },
    pic : {
        height : 0.3 * ScreenHeight,
        width : 0.8 * ScreenWidth,
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
    collateral_images : {
        width : 4 * ScreenWidth ,
        height : 0.4 * ScreenHeight,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',

    },
    cam_icon_Collateral : {
        position : 'absolute',
        bottom : 10 ,
        right : 10,
    },
    CP : {
        height : 0.3 * ScreenHeight,
        width : 0.6 * ScreenWidth,
        justifyContent : 'center',
        alignItems : 'center',
        elevation : 3,
        backgroundColor : 'white'
    },
    CP_Image : {
        height : 0.3 * ScreenHeight,
        width : 0.6 * ScreenWidth,
    },
    bottom : {
        top : 20,
        height : 0.1 * ScreenHeight,
        width : ScreenWidth
    },
    description_collateral_icons : {
        width : 0.60 * ScreenWidth,
        height : 0.08 * ScreenHeight,
        position : 'absolute',
        top : 0,
        backgroundColor : 'rgba(0,0,0,0.7)',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    description : {
        width : 0.60 * ScreenWidth,
        height : 0.08 * ScreenHeight,
        position : 'absolute',
        bottom : 0,
        backgroundColor : 'rgba(0,0,0,0.7)',
        justifyContent : 'center',
        alignItems : 'center'
    },
    descript_text : {
        color : 'white'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },

})
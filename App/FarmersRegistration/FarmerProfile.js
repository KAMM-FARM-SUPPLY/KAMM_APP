import React , {useEffect} from 'react'
import {View , Text , StyleSheet , ScrollView , FlatList , SafeAreaView , Image , BackHandler , ActivityIndicator} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {Avatar} from 'react-native-elements'
import Separator from '../Components/Separator'


function FarmerProfile(props) {
    const profile = props.route.params['Profile_info']
    useEffect(()=>{
        const backAction = () => {
            props.navigation.navigate('Welcome')
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      },[])
  return (
    <SafeAreaView style = {styles.safeAreaView}>
        <ScrollView contentContainerStyle = {styles.scroll_items} style = {styles.scroll}>
            <View style = {styles.header}>

                <View style={styles.profile_pic}>
                    {
                        profile ? (
                            <Avatar rounded source = {{ uri : profile.Profile_picture }} size = {'xlarge'}  />
                        ) : (
                            <Avatar rounded containerStyle = {{ backgroundColor : 'rgba(0,0,0,0.7)' }} icon = {{  name : 'user' , type : 'font-awesome' }} size = {'xlarge'}  />
                        )
                    }
                </View>

                <View style = {styles.info}>
                    <Text style = {styles.text_info}>Farmer id : {profile.id ? (profile.id) : ("#0001")}</Text>
                    <Text style = {styles.text_info}>Name : {profile.Name}</Text>
                    <Text style = {styles.text_info}>Gender : {profile.Gender}</Text>
                    <Text style = {styles.text_info}>Tel.no : {profile.Phone_number}</Text>
                    <Text style = {styles.text_info}>District : {profile.District}</Text>
                    <Text style = {styles.text_info}>Subcouty : {profile.Subcounty}</Text>
                    <Text style = {styles.text_info}>Village : {profile.Village}</Text>

                </View>

            </View>
            <View style={styles.NIN_photos}>
                <Text style = {styles.headers}>National ID</Text>
                <Image source = {{uri : profile.Front_side_id}} style = {styles.NIN_pic} />
                <Image source = {{uri : profile.Hind_side_id}} style = {styles.NIN_pic} />

            </View>

            <View style = {styles.farm_info}>
                <Text style = {styles.headers}>Farm information</Text>

                <View style = {styles.farm_info_list}>
                    <Text>Total land acreage</Text>
                    <Text>{profile.Total_land_acreage}</Text>
                </View>
                <View style = {styles.farm_info_list}>
                    <Text>Coffee acreage</Text>
                    <Text>{profile.Coffee_acreage}</Text>
                </View>
                <View style = {styles.farm_info_list}>
                    <Text>Number of trees</Text>
                    <Text>{profile.No_of_trees}</Text>
                </View>
                <View style = {styles.farm_info_list}>
                    <Text>Unproductive trees</Text>
                    <Text>{profile.Unproductive_trees}</Text>
                </View>
                <View style = {styles.farm_info_list}>
                    <Text>Coffee production</Text>
                    <Text>{profile.Ov_coffee_prod}</Text>
                </View>


            </View>

            {/* <View style = {styles.Loan_applications}>
                <Text style = {styles.headers}>Loan Applications Summary</Text>
                
            </View> */}
        </ScrollView>
    </SafeAreaView>
  )
}

export default FarmerProfile

const styles = StyleSheet.create({
    safeAreaView : {
        flex : 1,
    },
    scroll : {
        flex : 1,
    },
    scroll_items : {
        alignItems : 'center'
    },
    header : {
        flexDirection : 'row',
        height : 0.45 * ScreenHeight ,
        width : ScreenWidth,
        justifyContent : 'space-around',
        alignItems : 'center',
    },
    profile_pic : {
        height : 0.4 * ScreenHeight,
        width : 0.5 * ScreenWidth,
        justifyContent : 'center',
        alignItems : 'center'
    },
    info : {
        height : 0.4 * ScreenHeight,
        width : 0.5 * ScreenWidth,
        justifyContent : 'space-around',
        alignItems : 'flex-start',
    },
    text_info : {
        fontSize : 15,
        fontWeight : 'bold',
    } ,
    NIN_photos : {
        height : 0.7 * ScreenHeight,
        width : 0.95 * ScreenWidth,
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'space-around',
        borderWidth : 1,
        borderColor : 'black',
        borderRadius : 10

    },
    headers : {
        fontSize : 13,
        fontWeight : 'bold',
    },
    NIN_pic : {
        height : 0.3 * ScreenHeight,
        width : 0.9 * ScreenWidth
    },
    farm_info : {
        height : 0.6 * ScreenHeight,
        width : 0.95 * ScreenWidth,
        // backgroundColor : 'red',
        alignItems : 'center',
        justifyContent : 'space-around',
    },
    farm_info_list : {
        width : 0.86 * ScreenWidth,
        height : 40,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    Loan_applications : {
        height : 0.4 * ScreenHeight,
        width :  ScreenWidth,
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    LA_summary : {
        width : ScreenWidth,
        height : 0.3 * ScreenHeight,
        backgroundColor : 'red'
    }

})
import React , {useRef , useState , useEffect} from 'react'
import {View , Text  , TouchableOpacity , StyleSheet} from  'react-native'
import SignatureScreen from "react-native-signature-canvas";
import {useDispatch, useSelector} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'


import Farmer from '../../Helpers/FarmerRegistration';
import FormData, {getHeaders} from 'form-data'




function Signature(props) {

    const dispatch = useDispatch()
    const redux_state = useSelector(state => state.Reducer)
    const [Registering , setRegistering] = useState(false)


    const ref = useRef();

    const handle_on_complete = (profile_info) => {
      setRegistering(false)
      props.navigation.navigate("Profile" , {'Profile_info' : profile_info})

    }

    const onError = (message) => {
      setRegistering(false)
      alert(message)
    }

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {

      if ((redux_state['Farmer_info_visit'] != false)){

        console.log(redux_state['registration'])
        console.log(redux_state['registration_pics'])


      }else {
        // dispatch({type : 'Add_field' , key : 'Signature' , value : signature})
        // console.log(signature)
        setRegistering(true)
        // Hit the apis
        const form_data = new FormData()
        form_data.append('back-side(NIN)' , redux_state['registration_pics']['back-side(NIN)'])
        form_data.append('front-side(NIN)' , redux_state['registration_pics']['front-side(NIN)'])
        form_data.append('Profile-photo' , redux_state['registration_pics']['Profile-photo'])

        Farmer.Register({...redux_state['registration'] , 'Signature' : signature} , form_data , handle_on_complete,onError)

      }
        
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleEnd = () => {
        // ref.current.readSignature();
    };

    // Called after ref.current.getData()r
    const handleData = (data) => {
        console.log(data);
    };
  return (
    <View style = {{flex :1 }}>
      <Spinner
          visible={Registering}
          textContent={'Registering ' + redux_state['registration']['Name'] + '...'}
          textStyle={styles.spinnerTextStyle}
      />
      <SignatureScreen
        ref={ref}
        onEnd={handleEnd}
        onOK={handleOK}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onGetData={handleData}
        autoClear={true}
        descriptionText={'Scribble your signature'}
      />
    </View>
    
  )
}

export default Signature

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
})


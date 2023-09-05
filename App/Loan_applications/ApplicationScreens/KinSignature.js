import React , {useRef , useState , useEffect} from 'react'
import {View , Text  , TouchableOpacity , StyleSheet} from  'react-native'
import SignatureScreen from "react-native-signature-canvas";
import {useDispatch, useSelector} from 'react-redux'


function KinSignature(props) {
    const ref = useRef();

    const dispatch = useDispatch()
    const redux_state = useSelector(state => state.Reducer)


    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        dispatch({type : 'Loan_app_kin' , key : 'signature' , value : signature})
        props.navigation.navigate('Applicant Signature')

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

    // Called after ref.current.getData()
    const handleData = (data) => {
        console.log(data);
    };

    useEffect(()=>{
        // console.log(redux_state['Loan_app_kin'])
    },[])
  return (
    <View style = {{flex : 1}}>
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

export default KinSignature
import React , {useRef , useState , useEffect} from 'react'
import {View , Text  , TouchableOpacity , StyleSheet} from  'react-native'
import SignatureScreen from "react-native-signature-canvas";
import {useDispatch, useSelector} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import DialogInput from 'react-native-dialog-input';
import FormData, {getHeaders} from 'form-data'




function EmployeeSignature(props) {

    const dispatch = useDispatch()
    const redux_state = useSelector(state => state.Reducer)
    const [Registering , setRegistering] = useState(false)
    const [visible , setvisible] = useState(false)
    const [comment , setcomment] = useState('');
    const [signature , setsignature] = useState('')

    const ref = useRef();

    const handle_on_complete = (profile_info) => {
      

    }

    const onError = (message) => {
      setRegistering(false)
      alert(message)
    }

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        setsignature(signature)
        setvisible(true)
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
  return (
    <View style = {{flex :1 }}>
        <Spinner
            visible={Registering}
            textContent={''}
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

        <DialogInput 
          isDialogVisible={visible}
          title={"Enter a genuine comment."}
          message={"This comment will be used during the evaluation of the visit made "}
          hintInput ={"Comment ..."}
          // textInputProps={{keyboardType : 'numeric'}}
          submitInput={ (inputText) => {
            setvisible(false);
            dispatch({type : 'Add_field' , key : 'Employee_signature' , value : signature})
            dispatch({type : 'Add_field' , key : 'Employee_comment' , value : inputText})
            props.navigation.navigate("Signature")
          }}
          closeDialog={() => setvisible(false)}>
        </DialogInput>
    </View>
    
  )
}

export default EmployeeSignature
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
})


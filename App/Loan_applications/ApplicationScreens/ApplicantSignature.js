import React , {useRef , useState , useEffect} from 'react'
import {View , Text  , TouchableOpacity , StyleSheet} from  'react-native'
import SignatureScreen from "react-native-signature-canvas";
import {useDispatch, useSelector} from 'react-redux'
import { LoanApplication } from '../../Helpers/LoanApplication';
import Spinner from 'react-native-loading-spinner-overlay'
import FormData, {getHeaders} from 'form-data'
import Collateral from './Collateral';



function ApplicantSignature(props) {
    const ref = useRef();

    const dispatch = useDispatch()
    const redux_state = useSelector(state => state.Reducer)
    const [registering , setregistering] = useState(false)

    const onSuccess = (info) =>{
        setregistering(false)
        //alert('Loan application created successfully')
        
        props.navigation.navigate('Loan Application' , {'Profile_info' : info , 'registration' : true})
    }

    const onError = () =>{
        setregistering(false)
        alert('An error occured during the creation of the process')
    }

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        setregistering(true)
        //console.log(redux_state['Loan_app_details'])
        //console.log(signature)
        //console.log({...redux_state['Loan_app_kin'] , Signature : ''})
        //console.log(redux_state['Loan_identity'])
        //console.log(redux_state['Loan_app_collateral'])
        console.log(redux_state['Loan_images'])
        //Loading the formdata

        //computing the total_cost for the Loan_app_details
        let total_cost = 0
        for(let i =0; i < redux_state['Loan_app_details'].length; i++){
            total_cost +=  (parseInt(redux_state['Loan_app_details'][i].Price) * parseInt(redux_state['Loan_app_details'][i].Quantity))
        }

        const formdata = new FormData()
        formdata.append('Loan_app_details' , JSON.stringify(redux_state['Loan_app_details']))
        formdata.append('Loan_app_kin' , JSON.stringify(redux_state['Loan_app_kin']))
        formdata.append('Loan_identity' , JSON.stringify({farmer : redux_state['Loan_identity'] , Signature : signature , Total_cost : total_cost}))
        formdata.append('Loan_app_collateral' , JSON.stringify(redux_state['Loan_app_collateral']))

        //Loading images 
        formdata.append('Active_picture' , redux_state['Loan_images']['Active_picture'])
        formdata.append('LC1_letter' , redux_state['Loan_images']['LC1_letter'])
        formdata.append('Kin_image' , redux_state['Loan_images']['Kin_image'])
        formdata.append('front_side_id' , redux_state['Loan_images']['front_side_id'])
        formdata.append('back_side_id' , redux_state['Loan_images']['back_side_id'])

        //Loading collateral images
        for(let i=1; i<=6; i++){
            if (redux_state['Loan_images']['Collateral_' + i]){
                formdata.append('Collateral_' + i , redux_state['Loan_images']['Collateral_'+i])
            }
        }



        //formdata.append('Loan_images' , redux_state['Loan_images'])

        LoanApplication.RegisterApplication(formdata , onSuccess , onError)

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
    <View style = {{flex : 1}}>
        <Spinner
          visible={registering}
          textContent={'Creating Loan application . Wait a moment'+ '...'}
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

export default ApplicantSignature

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
})
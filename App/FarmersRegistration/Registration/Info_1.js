import React , {useState , useEffect} from 'react'
import {View , Text , StyleSheet , TouchableOpacity , ScrollView} from 'react-native'
import { Sae , Fumi , Kohana , Hoshi } from 'react-native-textinput-effects'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import DynamicForm from '@coffeebeanslabs/react-native-form-builder';
import {useDispatch, useSelector} from 'react-redux'



function Info_1(props) {
    const [Name , setName] = useState('')
    const formTemplate = {
        data: [
          
          {
            index : 1,
            component: 'input-text',
            field_name: 'Name',
            is_mandatory: 'true',
            meta: {
              label: 'Name of the farmer',
              placeholder: 'Enter name..'
            }
          },
          {
            index : 2,
            component: 'input-text',
            field_name: 'Phone',
            is_mandatory: 'true',
            meta: {
                label: 'Phone number',
                placeholder: 'Phone number'
            }
          },
          {
            index : 3,
            component: 'input-text',
            field_name: 'year',
            is_mandatory: 'true',
            meta: {
                label: 'Year of birth',
                placeholder: 'Year of birth'
            }
          },
          

          {
            index : 4,
            component: 'input-text',
            field_name: 'NIN',
            is_mandatory: 'true',
            meta: {
                label: 'NIN number',
                placeholder: 'NIN number'
            }
          },

          
          {
            index : 5,
            component: 'input-radio',
            field_name: 'Gender',
            is_mandatory: 'true',
            meta: {
              text: 'Your Gender',
              data: [
                {
                  label: 'Male',
                  value: 'male'
                },
                {
                  label: 'Female',
                  value: 'female'
                }
              ]
            }
          },
          
          {
            index : 6,
            component: 'input-radio',
            field_name: 'Marital',
            is_mandatory: 'true',
            meta: {
              text: 'Marital Status',
              data: [
                {
                  label: 'Single',
                  value: 'single'
                },
                {
                  label: 'Married',
                  value: 'married'
                },
                {
                    label: 'Divorced',
                    value: 'divorced'
                }
              ]
            }
          },
          {
            index : 7,
            component: 'input-text',
            field_name: 'Land-coverage',
            is_mandatory: 'true',
            meta: {
              label: 'Land coverage',
              placeholder: 'Land coverage..'
            }
          },
          {
            index : 8,
            component: 'input-text',
            field_name: 'Coffee-acreage',
            is_mandatory: 'true',
            meta: {
              label: 'Coffee acreage',
              placeholder: 'Coffee acreage..'
            }
          },
          {
            index : 9,
            component: 'input-text',
            field_name: 'Number-of-trees',
            is_mandatory: 'true',
            meta: {
              label: 'Number of trees',
              placeholder: 'Total number of trees..'
            }
          },
          {
            index : 10,
            component: 'input-text',
            field_name: 'unproductive-trees',
            is_mandatory: 'true',
            meta: {
              label: 'Number of unproductive trees',
              placeholder: 'Total number of unproductive trees..'
            }
          },
          {
            index : 11,
            component: 'input-text',
            field_name: 'Coffee-prod',
            is_mandatory: 'true',
            meta: {
              label: 'Total coffee production',
              placeholder: 'Total coffee production in kgs'
            }
          },
        ]
      }

      useEffect(()=>{
        
      },[])
      const redux_state = useSelector(state => state.Reducer)
      // console.log(redux_state['registration'])
      const dispatch = useDispatch()
    
      const onSubmit = formFields => {
        // Actions on submit button click.
        dispatch({type : 'Add_field' , key : 'Coffee_acreage' , value : formFields['Coffee-acreage'].value})
        dispatch({type : 'Add_field' , key : 'Ov_coffee_prod' , value : formFields['Coffee-prod'].value})
        dispatch({type : 'Add_field' , key : 'Gender' , value : formFields['Gender'].value})
        dispatch({type : 'Add_field' , key : 'Total_land_acreage' , value : formFields['Land-coverage'].value})
        dispatch({type : 'Add_field' , key : 'Name' , value : formFields['Name'].value})
        dispatch({type : 'Add_field' , key : 'NIN_no' , value : formFields['NIN'].value})
        dispatch({type : 'Add_field' , key : 'No_of_trees' , value : formFields['Number-of-trees'].value})
        dispatch({type : 'Add_field' , key : 'Unproductive_trees' , value : formFields['unproductive-trees'].value})
        dispatch({type : 'Add_field' , key : 'Marital_status' , value : formFields['Marital'].value})
        dispatch({type : 'Add_field' , key : 'Year_of_birth' , value : formFields['year'].value})
        dispatch({type : 'Add_field' , key : 'Phone_number' , value : formFields['Phone'].value})

        // console.log(formFields)
        props.navigation.navigate("National Id photos")

      }
  return (
    <ScrollView style={styles.container}>
        <DynamicForm formTemplate={formTemplate} onSubmit={onSubmit} />
    </ScrollView>
  )
}

export default Info_1

const styles = StyleSheet.create({
    container : {
        flex : 1,
        
    },
    viewcontainer_style : {
        flex : 1 ,
        flexDirection : 'column',
        justifyContent : 'space-around',
        alignItems : 'center'
    } ,
    button : {
        width : 200,
        height : 50,
        borderRadius : 15,
        backgroundColor : '#246EE9',
        justifyContent : 'center',
        alignItems : 'center'
    }

})
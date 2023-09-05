import React , {useState , useEffect} from 'react'
import {View , Text , StyleSheet , ScrollView , FlatList , TouchableOpacity , Alert} from 'react-native'
import {Avatar} from 'react-native-elements'
import Separator from '../../Components/Separator'
import { ScreenWidth , ScreenHeight } from 'react-native-elements/dist/helpers'
import DialogInput from 'react-native-dialog-input';
import {useDispatch, useSelector} from 'react-redux'


function Products(props) {

  const [products , setproducts] = useState([
    {id : 1 , name : 'Java' , selling_rate : '200000'},
    {id : 2 , name : 'NPK' , selling_rate : '200000'},
    {id : 3 , name : 'Urea' , selling_rate : '200000'},
    {id : 4 , name : 'DAP' , selling_rate : '200000'},
    {id : 5 , name : 'CAN' , selling_rate : '200000'},

  ])
  const [visible, setVisible] = useState(false);
  const [Active_item , setActive_item] = useState(null)

  const category = props.route.params['Category']

  const dispatch = useDispatch()
  const redux_state = useSelector(state => state.Reducer)



  useEffect(()=>{
    setproducts(props.route.params['Category'].products)
  },[])


  return (
    <View style = {styles.container}>
      <Text style = {styles.heading}>Products under {category.name}</Text>
      <View style = {{flex : 1 , top : 40}}>
        <FlatList 
          data = {products}
          ItemSeparatorComponent={()=><Separator/>}
          renderItem={(Item , index)=>(
            <TouchableOpacity style = {styles.item} onPress = {()=>{
              setActive_item(Item.item)
              setVisible(true)
            }}>
              <Text>{Item.item.id}</Text>
              <Text>{Item.item.name}</Text>
              <Text>shs.{Item.item.selling_rate}</Text>
              <Avatar size="large" icon = {{ name : 'product-hunt' , type : 'font-awesome', color : '#246EE9' , size : 40 }} rounded = {false}/>

            </TouchableOpacity>
          )}

        />
      </View>
      <DialogInput 
          isDialogVisible={visible}
          title={Active_item ? (Active_item.name) : "Quantity"}
          message={"Enter the quantity"}
          hintInput ={"Enter number such as 2 , 3, etc"}
          textInputProps={{keyboardType : 'numeric'}}
          submitInput={ (inputText) => {
              if (!isNaN(inputText)){
                dispatch({type : 'Loan_app_details' , product : {Name : Active_item.name , Quantity : inputText , Price : Active_item.selling_rate } })
                setVisible(false);
                // props.navigation.goBack(redux_state['Loan_app_screen_key'])
                props.navigation.goBack()
                props.navigation.goBack()

              }
          }}
          closeDialog={() => setVisible(false)}>
      </DialogInput>
        
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  container : {
    flex :1 ,
    justifyContent : 'center',
    alignItems : 'center'
  },
  heading : {
    fontSize : 15,
    fontWeight : 'bold',
    top : 20,
  },
  item : {
    height : 0.1 * ScreenHeight,
    width : 0.95 * ScreenWidth,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around'
  }

})
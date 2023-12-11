import React , {useEffect , useState}from 'react'
import {View , Text , Pressable , StyleSheet , TouchableOpacity , FlatList , ActivityIndicator} from 'react-native'
import { ScreenHeight , ScreenWidth } from 'react-native-elements/dist/helpers'
import {useDispatch, useSelector} from 'react-redux'
import {Avatar} from 'react-native-elements'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import axios from "axios";
import AppConstants from '../../Constants/AppConstants'
import { Products } from '../../Helpers/Products'

export const Category = (props) => {

  const [Categories , setCategories] = useState(null)

  const dispatch = useDispatch()
  const redux_state = useSelector(state => state.Reducer)


  useEffect(()=>{
    if (AppConstants.connected){
      Products.FetchProducts(setCategories)
    }else{
      //Getting data from the cache
      setCategories(redux_state['retrieved_data']['Products'])
    }

  },[])


  if (Categories == null){
    return (
      <View style = {styles.Indicator}>
          <ActivityIndicator/>
          <Text>Loading Applications...</Text>
      </View>
    )
  }

  return (
    <View style={styles.screen}>

        <FlatList
          numColumns={2}
          horizontal = {false}
          contentContainerStyle = {styles.container}
          data = {Categories}
          renderItem={(item , index)=>(
            <TouchableOpacity style = {styles.item} onPress={()=>{
                props.navigation.navigate('Products' , {Category : item.item})
            }}>
              <Avatar size="large" icon = {{ name : 'tasks' , type : 'font-awesome', color : '#246EE9' , size : 40 }} rounded = {false}/>
              <Text>{item.item.name}</Text>
            </TouchableOpacity>
          )}
        />
        

        

    </View>
  )
}



export default Category

const styles = StyleSheet.create({
  screen : {
    flex : 1
  },
  container : {
    flex: 1,
    flexDirection: "column",
    //flexWrap: "wrap",
    width: ScreenWidth,
    paddingHorizontal: 0.1 * ScreenHeight,
    paddingTop : 30,
    alignItems : 'center',
    justifyContent: "space-around",
    //backgroundColor : 'red'

  },
  item : {
    height : ScreenHeight * 0.25,
    width : ScreenWidth * 0.35,
    // backgroundColor : 'red',
    borderRadius : 10,
    elevation : 5,
    flexDirection : 'column',
    justifyContent : 'space-around',
    alignItems : 'center',

    
    
  },
  Indicator : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
 },
})
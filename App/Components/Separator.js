import React from 'react'
import {View , Text  , StyleSheet} from 'react-native'

function Separator(props) {
  return (
    <View
    style={{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }}
    />
  )
}

export default Separator


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import FarmerLogic from '../../../Helpers/Farmer';
import { Excel } from '../../../Helpers/Excel';
import AppConstants from '../../../Constants/AppConstants';
import { useDispatch, useSelector } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';

function Verified(props) {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const reduxState = useSelector(state => state.Reducer);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Assuming your API endpoint supports pagination with a 'page' parameter
      const response = await FarmerLogic.Get_farmers(true, (users)=>{
        if (verifiedUsers.length <= 0){
            setVerifiedUsers(users)
        }else{
            setVerifiedUsers({
                ...users,
                'items' : [
                    ...verifiedUsers['items'],
                    ...users['items']
                ]
            })
        }
        
      }, page);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (AppConstants.connected) {
      fetchData();
    } else {
      // Get data from redux state
      let users = [];
      reduxState['retrieved_data']['farmers'].forEach(item => {
        if (item['Active'] === 'False') {
          users.push(item);
        }
      });
      setVerifiedUsers(users);
    }
  }, [page]);

  const renderFooter = () => {
    return loading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (verifiedUsers.length === 0) {
    return (
      <View style={styles.Indicator}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.exportBtn}>
        <View style={{ width: 0.7 * ScreenWidth }}>
          <Button onPress={async () => await Excel.Export_to_excel(verifiedUsers, 'verified Farmers')} title="Export to excel" />
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={verifiedUsers['items']}
          //keyExtractor={item => item.id.toString()} // Change 'id' to your unique key
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Profile', { Profile_info: item })}>
              <View style={styles.thumbnail}>
                <Avatar rounded source={{ uri: item.Profile_picture }} size={'medium'} />
                <View style={styles.Name}>
                  <Text style={styles.Name_txt}>{item.Name + ' ' + item.Given_name}</Text>
                  <Text style={styles.Normal_txt}>{item.Phone_number}</Text>
                  <Text style={styles.Normal_txt}>{item.Village}</Text>
                </View>
              </View>

              <View style={styles.more_info}>
                <Avatar rounded source={{ uri: item.Signature }} size={'medium'} />
              </View>
            </TouchableOpacity>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
}

export default Verified;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  exportBtn: {
    width: ScreenWidth,
    height: 0.13 * ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 0.15 * ScreenHeight,
    width: 0.94 * ScreenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thumbnail: {
    width: 0.65 * ScreenWidth,
    height: 0.12 * ScreenHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  Name: {
    width: 0.45 * ScreenWidth,
    height: 60,
  },
  Normal_txt: {
    fontSize: RFValue(13),
  },

  Name_txt: {
    fontWeight: 'bold',
    fontSize: RFValue(18),
  },
  Indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

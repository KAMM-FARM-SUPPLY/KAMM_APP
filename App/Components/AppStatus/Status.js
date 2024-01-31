import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity , ScrollView , ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScreenWidth } from 'react-native-elements/dist/helpers';


const AppScreen = () => {
  // Replace these values with your actual data
  const isConnected = true;
  const avatarImage = 'http://10.10.134.122:8020/Media/Profile_pic/2024/01/30/073c62f1-4105-4677-aee5-6e20fab949a6.jpeg';
  const name = 'John Doe';
  const group = 'Field Officers Group';
  const farmersRegistered = 120;
  const loanApplications = 50;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Application Status </Text>
        <View style={styles.statusContainer}>
        <Icon name={isConnected ? 'wifi' : 'bell-slash'} size={15} color={isConnected ? 'green' : 'red'} />
          {/* <Image source={isConnected ? require('./assets/wifi-connected.png') : require('./assets/wifi-disconnected.png')} style={styles.icon} /> */}
          <Text style={styles.statusText}>{isConnected ? 'Connected' : 'Not Connected'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Profile</Text>
        <View style={styles.profileContainer}>
          <Image source={{ uri: avatarImage }} style={styles.avatar} />
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.groupText}>({group} Affiliation)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farmers Registered </Text>

        <View style = {{...styles.statusContainer , width : 0.8 * ScreenWidth , justifyContent : 'space-between'}}>
          <View style = {{...styles.statusContainer , width : 0.3 * ScreenWidth}}>
            <Icon name={'user-circle'} size={15} color={'green'} />
            <Text style={styles.statText}>{farmersRegistered} Farmers</Text>
          </View>
          
          <TouchableOpacity onPress={()=>{

          }} style = {{
            ...styles.statusContainer ,
            width : 0.3 * ScreenWidth
            
            }}>
            <ActivityIndicator size="small" color="green" />
            {/* <Icon name={'arrow-up'} size={15} color={'green'} /> */}
            <Text style={styles.statText}>4 Farmers</Text>
          </TouchableOpacity>

        </View>
        

        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Farmers</Text>

        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loan Applications Submitted</Text>

        <View style = {{...styles.statusContainer , width : 0.8 * ScreenWidth , justifyContent : 'space-between'}}>
          <View style = {{...styles.statusContainer , width : 0.3 * ScreenWidth}}>
            <Icon name={'user-circle'} size={15} color={'green'} />
            <Text style={styles.statText}>{loanApplications} Applications</Text>
          </View>
          
          <TouchableOpacity onPress={()=>{

          }} style = {{
            ...styles.statusContainer ,
            width : 0.3 * ScreenWidth
            
            }}>
            <ActivityIndicator size="small" color="green" />
            {/* <Icon name={'arrow-up'} size={15} color={'green'} /> */}
            <Text style={styles.statText}>2 Applications</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Applications</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width : 0.4 * ScreenWidth,
    justifyContent : 'space-around'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  statusText: {
    fontSize: RFValue(16),
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupText: {
    fontSize: 16,
    color: 'gray',
  },
  statText: {
    fontSize: RFValue(16),
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    
  },
  viewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AppScreen;

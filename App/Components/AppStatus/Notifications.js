import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RFValue } from 'react-native-responsive-fontsize';


const Notifications = () => {
  // Replace these with your actual notification data
  const notifications = [
    { id: 1, type: 'alert', message: 'Emergency: Take immediate action!' },
    { id: 2, type: 'message', message: 'New message from John Doe' },
    { id: 3, type: 'reminder', message: "Don't forget to attend the meeting at 3 PM"},
    // Add more notifications as needed
  ];

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem} onPress={() => handleNotificationPress(item)}>
      <Icon name={getIconName(item.type)} size={30} color={getIconColor(item.type)} />
      <View style={styles.notificationTextContainer}>


        <View style = {styles.notificationheader}>
            <Text style={styles.notificationType}>{getNotificationTypeText(item.type)}</Text>
            <Text style = {{...styles.notificationMessage , fontSize : RFValue(16)}}>(Management)</Text>
        </View>
        
        <Text style={styles.notificationMessage}>{item.message}</Text>

        <View style = {styles.notificationTime}>
            <Text style = {{...styles.notificationMessage, fontSize : RFValue(15)}}>{formatTimestamp('2022-02-02T15:45:00Z')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleNotificationPress = (notification) => {
    // Implement the logic to handle the notification press
    console.log('Notification pressed:', notification);
  };

  const getIconName = (type) => {
    switch (type) {
      case 'alert':
        return 'error';
      case 'message':
        return 'message';
      case 'reminder':
        return 'schedule';
      default:
        return 'notifications';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'alert':
        return '#9E2A2B';
      case 'message':
        return '#574AE2';
      case 'reminder':
        return 'green';
      default:
        return 'gray';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the formatting as needed
  };

  const getNotificationTypeText = (type) => {
    switch (type) {
      case 'alert':
        return 'Alert';
      case 'message':
        return 'Message';
      case 'reminder':
        return 'Reminder';
      default:
        return 'Notification';
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotificationItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  notificationTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  notificationType: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: RFValue(14),
    color: 'gray',
  },
  notificationheader:{
    width : 0.7 * ScreenWidth,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
  },
  notificationTime:{
    width : 0.7 * ScreenWidth,
    flexDirection : 'row',
    justifyContent : 'flex-end',
    alignItems : 'center'
  }
});

export default Notifications;

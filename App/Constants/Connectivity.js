import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnectivity = async () => {
  try {
    const response = await NetInfo.fetch();
    
    if (response.isConnected) {
      // Device is connected to the internet
      return true;
    } else {
      // Device is not connected to the internet
      return false;
    }
  } catch (error) {
    // An error occurred while checking connectivity
    console.error('Error checking internet connectivity:', error);
    return false;
  }
};
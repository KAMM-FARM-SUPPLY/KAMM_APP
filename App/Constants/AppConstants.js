
import NetInfo from '@react-native-community/netinfo';



const check_connectivity = async () => {

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

}

export class AppConstants{
    static live_url = 'http://ec2-35-178-100-187.eu-west-2.compute.amazonaws.com'
    static debug_url = 'http://10.10.134.51:8020'
    static connected = !(check_connectivity())
    static Debug = true
}

export default AppConstants
import Geolocation from '@react-native-community/geolocation';
import { 
    PermissionsAndroid,
    Platform,
  } from 'react-native';

  


export class GeoLocation{

    constructor(setLocationStatus , setCurrentLatitude , setCurrentLongitude ){
        this.setLocationStatus = setLocationStatus;
        this.setCurrentLatitude = setCurrentLatitude;
        this.setCurrentLongitude = setCurrentLongitude;
    }

    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          this.getOneTimeLocation();
          this.subscribeLocationLocation();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              this.getOneTimeLocation();
              this.subscribeLocationLocation();
            } else {
                this.setLocationStatus("Permission Denied")
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };


      getOneTimeLocation = () => {
        this.setLocationStatus("Getting Location ...")
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            this.setLocationStatus("You are here")    
            //getting the Longitude from the location json
            const currentLongitude = 
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
    
            //Setting Longitude state
            this.setCurrentLongitude(currentLongitude);
            
            //Setting Longitude state
            this.setCurrentLatitude(currentLatitude);
          },
          (error) => {
            this.setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
          },
        );
      };


      subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change
            
            this.setLocationStatus('You are Here');
            console.log(position);
    
            //getting the Longitude from the location json        
            const currentLongitude =
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
    
            //Setting Longitude state
            this.setCurrentLongitude(currentLongitude);
    
            //Setting Latitude state
            this.setCurrentLatitude(currentLatitude);
          },
          (error) => {
            this.setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000
          },
        );
      };
}

export default GeoLocation
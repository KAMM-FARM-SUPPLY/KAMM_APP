import axios from "axios";
import AppConstants from "../Constants/AppConstants";


export class Administrative{
    static async Login(username , password , onsuccess , onFailed , onError){
        console.log("on")

        axios({
            method : 'POST',
            url : (AppConstants.Debug)?(AppConstants.debug_url +"/Login/") : (AppConstants.live_url +"/Login/"),
            data : {
                'username' : username,
                'password' : password,
            }
        }).then((response)=>{
            if (response.status == 202){
                onsuccess(response.data)
            }else{
                onError(response.data)
            }
        }).catch((reason)=>{
            onFailed(response.data)
        })

    }
}
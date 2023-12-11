import axios from "axios";
import AppConstants from "../Constants/AppConstants";


export class Sync{
    static GET_SYNC( onsuccess , onError ){
        axios({
            method : 'GET',
            url : AppConstants.Debug ? (AppConstants.debug_url + "/Get-sync/") : (AppConstants.live_url + "/Get-sync/"),
        }).then((Response)=>{
            onsuccess(Response.data)
        })
    }
}
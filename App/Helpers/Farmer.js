import axios from "axios";
import AppConstants from "../Constants/AppConstants";

export class FarmerLogic{

    static async get_farmer_village_list(Village , onComplete){
        axios({
            method : 'GET',
            url : AppConstants.Debug ?  (AppConstants.debug_url + '/Village_farmers/' + Village ) : (AppConstants.live_url + '/Village_farmers/' + Village),
            data : []
        }).then((Result)=>{
            onComplete(Result.data)
        })
    } 
    
    static async Get_farmers(verified , setFarmers){
        axios({
            method : 'GET',
            url : AppConstants.Debug ?  (AppConstants.debug_url + '/GetFarmers/?verified=' + verified) : (AppConstants.live_url + '/GetFarmers/?verified=' + verified),
            data : []
        }).then((Response)=>{
            setFarmers(Response.data)
            console.log(Response.data)
        })
    }

}

export default FarmerLogic
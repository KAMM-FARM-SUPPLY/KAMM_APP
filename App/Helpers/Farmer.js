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
    
    static async Get_farmers(verified , setFarmers , page , name = null){

        if (name == ""){
            name = null
        }
        
        axios({
        method: 'GET',
        url: AppConstants.Debug ?
            (AppConstants.debug_url + '/GetFarmers/') :
            (AppConstants.live_url + '/GetFarmers/'),
        params: {
            'status': verified,
            'page': page,
            'name_search': name,
        },
        })
        .then((Response) => {
            setFarmers(Response.data);
        })
        .catch((error) => {
            // Handle errors
            console.error('Error:', error);
        });
    }

}

export default FarmerLogic
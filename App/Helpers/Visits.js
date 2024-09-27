import axios from "axios";  
import AppConstants from "../Constants/AppConstants";


export class FarmerVisits{
    static async get_farmer_info(id , onSuccess){
        axios({
            method : 'GET',
            url : AppConstants.Debug ?  (AppConstants.debug_url + '/Farmer-detail/' + id + '/') : (AppConstants.live_url + '/Farmer-detail/' + id + '/'),
        }).then((Response)=>{
            if (Response.status == 200){
                //console.log(Response.data)
                onSuccess(Response.data)
            }else {
                alert('An error occured')
            }
        })
    }

    static async Get_Visits(status , employee_id ,onSuccess , onError){
        axios({
            method : 'GET',
            url : AppConstants.Debug?(AppConstants.debug_url + '/GetVisits') : (AppConstants.live_url + '/GetVisits'),
            params : {
                status : status,
                employee_id : employee_id
            }
        }).then((Response)=>{
            if (Response.status == 200){

                onSuccess(Response.data)
                

            }else {
                onError()
            }
        })
    }
}
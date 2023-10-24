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

    static async Get_Visits(onSuccess , onError){
        axios({
            method : 'GET',
            url : AppConstants.Debug?(AppConstants.debug_url + '/GetVisits') : (AppConstants.live_url + '/GetVisits'),

        }).then((Response)=>{
            if (Response.status == 200){
                let resolved_data = []
                for(let i=0; i<Response.data.length; i++){
                    //console.log(Response.data[i])
                    axios.get(Response.data[i]['Farmer_id']).then((response)=>{
                        resolved_data.push({...Response.data[i] , 'farmer_info':response.data})
                        // console.log(resolved_data)
                    })
                }
                // console.log(resolved_data)
                setTimeout(()=>{
                    onSuccess(resolved_data)
                },500)

            }else {
                onError()
            }
        })
    }
}
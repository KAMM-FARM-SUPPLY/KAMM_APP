import axios from "axios";
import AppConstants from "../Constants/AppConstants";


export class Farmer {
    static Register = async (data , form_data , onComplete , onError) => {
        axios({
            method : 'POST',
            url : AppConstants.Debug ?  (AppConstants.debug_url + '/Register_Farmer/') : (AppConstants.live_url + '/Register_Farmer/'),
            data : data
        }).then(async (Result)=>{
            if (Result.status ==500){
                onError(Result.data)
            }else {
                await this.Upload_pics(Result ,form_data , onComplete)
            }

        })
    }

    static Upload_pics = async (result ,form_data , onComplete , onError) => {
        axios({
            method : 'PUT',
            data : form_data,
            url : AppConstants.Debug ?  (AppConstants.debug_url + '/Upload_reg_pics/'+ result.data.id+'/') : (AppConstants.live_url + '/Upload_reg_pics/'+ result.data.id+'/'),
            headers : { 
                'content-type' : 'multipart/form-data',
            }

        }).then((Result)=>{
            if (Result.status == 202){
                if (Result.status == 500){
                    onError(Result.data)
                }else {
                    onComplete(Result.data)
                }
            }
        })
    }
}

export default Farmer
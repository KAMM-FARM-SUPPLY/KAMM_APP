import axios from "axios";
import AppConstants from "../Constants/AppConstants";

export class LoanApplication{
    static RegisterApplication(form_data , onSuccess , onError){
        axios({
            method : 'POST',
            url : AppConstants.Debug ? (AppConstants.debug_url + '/Create_application/') : (AppConstants.live_url + '/Create_application/'),
            data : form_data,
            headers : { 
                'content-type' : 'multipart/form-data',
            }
        }).then((Response)=>{
            console.log(Response.status)
            if (Response.status == 201){
                onSuccess(Response.data)
            }else{
                onError()
            }
        }).catch((onRejected)=>{onError()})

    }


    static GetApplicationsStatus = (query_id , status ,  onSuccess , onError) =>{
        axios({
            method : 'GET',
            url : AppConstants.Debug ?
            (AppConstants.debug_url + '/Queryapplications' + ((query_id != null) ? ('?id=' + query_id) : ('')) + ((status != null)?('?Status=' + status) : (''))) :
            (AppConstants.live_url + '/Queryapplications' + ((query_id != null) ? ('?id=' + query_id) : ('')) + ((status != null)?('?Status=' + status) : ('')))

        }).then((Response)=>{
            if (Response.status == 200){
                onSuccess(Response.data)
            }else{
                onError()
            }
        }).catch((onRejected)=>{onError()})
    }

    static Getfarmerinfo = async (url , onSuccess) => {
        axios({
            method : 'GET',
            url : url
        }).then((Response)=>{
            if (Response.status == 200){
                onSuccess(Response.data)
            }
        })

    }
}
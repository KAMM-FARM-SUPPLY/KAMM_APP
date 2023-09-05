import axios from "axios";  
import AppConstants from "../Constants/AppConstants";

export class Location{
    static async Get_districts(onComplete){
        axios({
            method : 'GET',
            url : AppConstants.Debug ?  (AppConstants.debug_url + '/Districts/') : (AppConstants.live_url + '/Districts/'),
            data : []
        }).then((Result)=>{
            onComplete(Result.data)
        })
    }

    static async Get_counties(onComplete , district_id){
        axios({
            method : 'GET',
            url : AppConstants.Debug ?  (AppConstants.debug_url + '/Subcounty?district_id='+district_id) : (AppConstants.live_url + '/Subcounty?district_id='+district_id),
            data : []
        }).then((Result)=>{
            onComplete(Result.data)
        })
    }

    static async Get_villages(onComplete , County_id){
        axios({
            method : 'GET',
            url : AppConstants.Debug ?  (AppConstants.debug_url + '/Villages?County_id='+County_id) : (AppConstants.live_url + '/Villages?County_id='+County_id),
            data : []
        }).then((Result)=>{
            onComplete(Result.data)
        })
    }
}
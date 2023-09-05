import axios from "axios";
import AppConstants from "../Constants/AppConstants";

export class Products {
    static FetchProducts = (setProducts) => {
        axios({
            method : 'GET',
            url : AppConstants.Debug ?  (AppConstants.debug_url + '/Get_All_Products') : (AppConstants.live_url + '/Get_All_Products'),
            
        }).then(async (Result)=>{
            setProducts(Result.data)
        })
    }
}
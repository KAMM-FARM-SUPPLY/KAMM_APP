import * as mime from 'react-native-mime-types'

export default Reducer = (state = {
    'default_color' : 'blue',
    Loan_app_details : [],
    Loan_app_screen_key : '',
    Farmer_info_visit : false
} , action ) => {
    switch(action.type){
        case 'change_color' : {
            return {
                ...state,
                default_color : 'red'
            }
            
        }
        case 'Reg_Farmer' : {
            return {
                ...state,
                registration : {

                },
                registration_pics : {

                }
            }
        }
        case 'Add_field' : {
            return {
                ...state,
                registration : {
                    ...state['registration'],
                    [action.key] : action.value
                }
            }
        }
        case 'Add_reg_pic' : {
            const newImageUri = "file:///" + action.pic.split("file:/").join("")
            return {
                ...state,
                registration_pics : {
                    ...state['registration_pics'],
                    [action.key] : {
                        uri : newImageUri,
                        type : mime.lookup(newImageUri),
                        name : newImageUri.split("/").pop()
                    }
                }
            }
        }
        case 'Loan_app_screen_key' : {
            return {
                ...state,
                Loan_app_screen_key : action.key
            }
        }
        case 'Loan_identity' : {
            return {
                ...state,
                Loan_identity : action.Loan_id
            }
        }
        case 'Loan_images' : {
            return {
                ...state,
                Loan_images : {
                    ...state['Loan_images'],
                    [action.key] : action.value
                }
            }
        }
        case 'Loan_info' : {
            return {
                ...state,
                Loan_info : {
                    ...state['Loan_info'],
                    [action.key] : action.value
                }
            }
        }
        case 'Loan_app_details' : {
            return {
                ...state,
                Loan_app_details : [
                    ...state['Loan_app_details'],
                    action.product
                ]
            }
        }
        case 'Remove_loan_detail' : {
            // let current_list = state.Loan_app_details
            return {
                ...state,
                Loan_app_details : action.Details
            }
        }
        case 'Loan_app_collateral' : {
            return {
                ...state,
                Loan_app_collateral : {
                    ...state['Loan_app_collateral'],
                    [action.key] : action.value
                }
            }
        }
        case 'Loan_app_kin' : {
            return {
                ...state,
                Loan_app_kin : {
                    ...state['Loan_app_kin'],
                    [action.key] : action.value
                }
            }
        }


        //Re-editing the information during visits farmers profile
        case 'Farmer_info_visit' : {
            return {
                ...state , 
                Farmer_info_visit : action.value
            }
        }

        

        default :
            return state
    }
}
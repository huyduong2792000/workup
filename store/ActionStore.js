import * as ActionType from './ActionType'
export const setCurrentUser=(data)=>{
    return {type:ActionType.SET_CURRENT_USER,data}
}
export const setSelectMutiple = (data) => {
    return {type:ActionType.SET_SELECT_MULTIPLE,data}
}
// export const SET_GROUP_SELECT = "SET_GROUP_SELECT"
// export const setGroupSelect=(data) => {        
//     return {type:SET_GROUP_SELECT,data}
// }
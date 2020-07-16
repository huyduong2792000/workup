
export const SET_TASKS_INFO = "SET_TASKS_INFO"
export const REFRESH = "REFRESH"
export const SELECT_MULTIPLE = "SELECT_MULTIPLE"
export const SELECT_SINGLE = "SELECT_SINGLE"
export const DELETE_SELECT = "DELETE_SELECT"
export const setTasksInfo=(prop)=>{    
    return {type:SET_TASKS_INFO,data:prop.data,dataSetSelect:prop.dataSetSelect||[]}
}

export const onRefresh=()=>{
    return {type:REFRESH,}
}
export const selectMultiple=(data)=>{
    return {type:SELECT_MULTIPLE,data}
}
export const selectSingle=(data)=>{
    return {type:SELECT_SINGLE,data}
}
export const deleteSelect=()=>{
    return {type:DELETE_SELECT}
}
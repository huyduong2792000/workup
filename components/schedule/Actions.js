export const SET_SCHEDULE = "SET_SCHEDULE"
export const SET_SCHEDULE_DETAIL = "SET_SCHEDULE_DETAIL"
export const REPEAT = "REPEAT"
export const ADD_WEEK = "ADD_WEEK"
export const SUB_WEEK = "SUB_WEEK"
export const ADD_TASKINFO = "ADD_TASKINFO"
export const SUB_TASKINFO = "SUB_TASKINFO"
export const REFRESH = "REFRESH"
export const ADD_SCHEDULE_DETAIL = "ADD_SCHEDULE_DETAIL"
export const DELETE_SCHEDULE_DETAIL = "DELETE_SCHEDULE_DETAIL"
export const deleteScheduleDetail=(index)=>{
    return {type:DELETE_SCHEDULE_DETAIL,index}
}
export const addScheduleDetail=()=>{
    return {type:ADD_SCHEDULE_DETAIL}
}
export const setScheduleDetail=(data)=>{    
    return {type:SET_SCHEDULE_DETAIL,data:data.data_detail,index:data.INDEX}
}
export const refresh=()=>{
    return {type:REFRESH}
}
export const setSchedule = (data)=>{        
    return {type:SET_SCHEDULE,data}
}
export const repeat=()=>{
    return {type:REPEAT}
}
export const addWeek=()=>{
    return {type:ADD_WEEK}
}
export const subWeek=(data)=>{
    return {type:SUB_WEEK,data}
}
export const addTaskinfo = (data)=>{
    return {type:ADD_TASKINFO,data}
}
export const subTaskinfo = (data)=>{
    return {type:SUB_TASKINFO,data}
}
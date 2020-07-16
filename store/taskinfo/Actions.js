import {
    SET_TASK_INFO,
    SAVE_TASK_INFO,
    GET_TASK_INFO,
    SELECT_MULTIPLE_FOLLOWERS_TASKINFO,
    SELECT_SINGLE_ASSIGNEE_TASKINFO
} from './ActionType'
export const setTaskInfo=(data)=>{            
    return {type:SET_TASK_INFO,data}
}
export const saveTaskInfo=(data)=>{
    return {type:SAVE_TASK_INFO,data}
}
export const getTaskInfo=data=>{
    return {type:GET_TASK_INFO,data}
}
export const setSelectMultipleFollowersTaskinfo = (data) => {    
    return {type:SELECT_MULTIPLE_FOLLOWERS_TASKINFO,data}
}
export const setSelectSingleAssigneeTaskinfo = (data) => {
    return {type:SELECT_SINGLE_ASSIGNEE_TASKINFO,data}

}
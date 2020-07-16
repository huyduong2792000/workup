
import {
    SET_CHECKLIST,
    SAVE_CHECKLIST,
    SAVE_CHECKLIST_SUCCESS,
    SAVE_CHECKLIST_FAIL,
    DELETE_CHECKLIST,
    ADD_TASKINFO,
    GET_CHECKLIST,
    SET_DAY_WORKER_WEEK,
    SET_DAY_WORKER_MONTH,
    SET_SHIFT,
    ADD_SHIFT,
    REMOVE_SHIFT
} from './ActionType' 
export const setChecklist=(data)=>{                  
    return {type:SET_CHECKLIST,data}
}
export const saveChecklist=(data)=>{            
    return {type:SAVE_CHECKLIST,data}
}
export const addTaskInfo=(data)=>{        
    return {type:ADD_TASKINFO,data}
}
export const getChecklist=(data)=>{
    return {type:GET_CHECKLIST,data}
}
export const setDayWorkerWeek=(data)=>{    
    return {type:SET_DAY_WORKER_WEEK,data}
}
export const setDayWorkerMonth=(data)=>{
    return {type:SET_DAY_WORKER_MONTH,data}
}
export const setShift=(data)=>{
    return {type:SET_SHIFT,data}
}
export const addShift=(data)=>{
    return {type:ADD_SHIFT,data}
}
export const removeShift=(data)=>{
    return {type:REMOVE_SHIFT,data}
}
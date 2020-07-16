export const CREATE_TASK = "CREATE_TASK"
export const createTask=(data)=>{
    return {type:CREATE_TASK,data}
}

export const SET_TASK = "SET_TASK"
export const setTask=(data)=>{
    return {type:SET_TASK,data}
}

export const TOGGLE_ADD_TASK = "TOGGLE_ADD_TASK"
export const setToggleAddTask=()=>{
    return {type:TOGGLE_ADD_TASK}
}

export const REFRESH = "REFRESH"
export const onRefresh=()=>{
    return{type:REFRESH}
}

export const SET_DONE = "SET_DONE"
export const setDone=(data)=>{
    return {type:SET_DONE,data}
}
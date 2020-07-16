import {SET_SCHEDULE,
    REPEAT,
    ADD_SCHEDULE_DETAIL,
    SET_SCHEDULE_DETAIL,
    REFRESH,
    DELETE_SCHEDULE_DETAIL}from './Actions'
const getWeek =(week_number=2)=> {
    var result ={}
    result.week_number = week_number
    var tasks_in_week = []
    var day_of_week = [0,1,2,3,4,5,6]
    for (var day in day_of_week){
        var obj={
            "day_of_week":parseInt(day),
            "tasks_in_day":[
                {
                    "day_of_week": "monday",
                    "end_hours_working": 12,
                    "index": 1,
                    "start_hours_working": 6,
                    "tasks_info":  [],
                },
                {
                    "day_of_week": "monday",
                    "end_hours_working": 6,
                    "index": 1,
                    "start_hours_working": 12,
                    "tasks_info":  [],
                }
            ],
            "week_number":week_number
        }
        tasks_in_week.push(obj)
    }    
    result.tasks_in_week = tasks_in_week    
    return result
}
const schedule=(state={},action)=>{    
    switch(action.type){
        case SET_SCHEDULE:                    
            if(action.data!=undefined){                
                return {...state,...action.data}
            }else if(state!=undefined){
                return state
            }else{
                return {}
            }
        case SET_SCHEDULE_DETAIL:
            var new_task_scheduledetail = state.task_scheduledetail
            new_task_scheduledetail[action.index] = action.data
            return{...state,task_scheduledetail:new_task_scheduledetail}
        case ADD_SCHEDULE_DETAIL:
            var task_scheduledetail = state.task_scheduledetail || []
            task_scheduledetail.push({
                "start_hours_working": null,
                "end_hours_working": null,
                "tasks_info": []
            })
            return{...state,task_scheduledetail:task_scheduledetail}
        case DELETE_SCHEDULE_DETAIL:
            var new_task_scheduledetail = state.task_scheduledetail
            new_task_scheduledetail.splice(action.index,1)
            return{...state,task_scheduledetail:new_task_scheduledetail}
        default:
            return state
    }
}

const repeat=(state=false,action)=>{
    switch(action.type){
        case REPEAT:       
            const repeat_status = !state                         
            return repeat_status
        default:
            return state
    }
}
const refresh = (state=0,action)=>{
    switch(action.type){
        case REFRESH:
            return state+1
        default:
            return state
    }
}
function reducer(state, action) {
    return {
        schedule: schedule(state.schedule, action),
        repeat: repeat(state.repeat, action),
        refresh: refresh(state.refresh, action),
    }
}
    export default reducer
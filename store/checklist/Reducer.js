import {
    SET_CHECKLIST,
    SAVE_CHECKLIST,
    SAVE_CHECKLIST_SUCCESS,
    SAVE_CHECKLIST_FAIL,
    ADD_TASKINFO,
    SET_DAY_WORKER_WEEK,
    SET_DAY_WORKER_MONTH,
    SET_SHIFT,
    ADD_SHIFT,
    REMOVE_SHIFT
} from './ActionType' 

const init_state = {
    checklist_name:'',
    note:'',
    cycle_worker:'week',
    days_worker_week:[0,1,2,3,4,5,6],
    days_worker_month:[],
    shifts: [
        {shift_name:'Sáng',start_hour_working:0,end_hour_working:1159},
        {shift_name:'Chiều',start_hour_working:1200,end_hour_working:2359}
    ],
    tasks_info: []
}

export function Checklist(state=init_state,action){
    switch(action.type){
        case SET_CHECKLIST:
            
            if(!action.data.days_worker_week){
                action.data.days_worker_week = [0,1,2,3,4,5,6]
            } 
            if(!action.data.shifts){
                action.data.shifts = [
                    {shift_name:'Sáng',start_hour_working:0,end_hour_working:1159},
                    {shift_name:'Chiều',start_hour_working:1200,end_hour_working:2359}
                ]
            }  
            if(!action.data.days_worker_month){
                action.data.days_worker_month = []
            }         
            return {...state,...action.data}
        case SET_DAY_WORKER_WEEK:                    
            let days_worker_week = state.days_worker_week || [] 
            let index_match = days_worker_week.findIndex((item,index)=>item === action.data)
            if(index_match !== -1){
                days_worker_week.splice(index_match,1)
            }else{
                days_worker_week.push(action.data)

            }
            return {...state,days_worker_week:days_worker_week}
        case SET_DAY_WORKER_MONTH:
            let days_worker_month = state.days_worker_month || []
            index_match = days_worker_month.findIndex((item,index)=>item == action.data)
            if(index_match !== -1){
                days_worker_month.splice(index_match,1)
            }else{
                days_worker_month.push(action.data)
            }
            return {...state,days_worker_month:days_worker_month}
        case SET_SHIFT:
            // let shifts = state.shifts
            return {...state,shifts:state.shifts.map((item,index)=>{
                if(index == action.data.index){
                    return {...item,...action.data.value}
                }else{
                    return item
                }
            })}
        case ADD_SHIFT:
            var shifts = state.shifts
            shifts.push(action.data)
            return {...state,shifts:shifts}
        case REMOVE_SHIFT:
            var shifts = state.shifts
            shifts.splice(action.data.index,1)
            return {...state,shifts:shifts}
        default:
            return state
    }
}

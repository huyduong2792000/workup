import React from 'react'
import {TOGGLE_ADD_TASK,SET_TASK,REFRESH,SET_DONE} from './Action'

const tasks=(state={},action)=>{
    switch(action.type){
        case SET_TASK:            
            return action.data
            // return 'dsfdsfd'
        case SET_DONE:
            
            return state.map((task,index)=>{
                if(task.id==action.data.id){
                    task.status=1
                }
                return task
            })
        default:
            return state
    }
}
const toggleAddTask=(state={},action)=>{
    switch(action.type){
        case TOGGLE_ADD_TASK:            
            return !state
        default:
            return state
    }
}

const refresh =(state,action)=>{
    switch(action.type){
        case REFRESH:            
            return state+1
        default:
            return state
    }
}
function reducer(state, action) {
    return {
        tasks: tasks(state.tasks, action),
        toggleAddTask: toggleAddTask(state.toggleAddTask, action),
        refresh: refresh(state.refresh, action),
    }
  }

  export default reducer

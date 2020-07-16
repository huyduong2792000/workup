import {
  SET_TASKS_INFO,
  REFRESH,
  SELECT_MULTIPLE,
  SELECT_SINGLE,
  DELETE_SELECT,
} from './Actions'
// import { combineReducers } from 'redux'
import BaseApi from '../common/BaseApi'
const tasksInfo = (state=[],action)=>{
  switch(action.type){
      case SET_TASKS_INFO:        
          const dataRender = action.data.map((taskinfo,index)=>{
              const check_index = state.findIndex((taskinfo_old)=>{
                  return taskinfo.id == taskinfo_old.id
              })
              const index_in_dataSetSelect = action.dataSetSelect.findIndex((data)=>{
                  return taskinfo.id == data.id
              })
              if((check_index!=-1&&state[check_index].isSelect==true)||index_in_dataSetSelect!=-1){
                  taskinfo.isSelect=true
              }else{
                  taskinfo.isSelect=false
              }
             return taskinfo
          })
          
          return [...dataRender]
      case SELECT_SINGLE:
          return state.map((taskinfo,index)=>{
              if(taskinfo.id==action.data.id){
                  return {...taskinfo,isSelect:true}
              }else{
                  return {...taskinfo,isSelect:false}
              }
          })
      case SELECT_MULTIPLE:
          return state.map((taskinfo,index)=>{
              if(taskinfo.id==action.data.id){
                  return {...taskinfo,isSelect:!taskinfo.isSelect}
              }
              return taskinfo
          })
      case DELETE_SELECT:
          const taskinfoSelect = state.filter((taskinfo)=>{
              return taskinfo.isSelect==true
          })
          BaseApi({collectionName:'task_info_delete_multiple'}).deleteMultiple(taskinfoSelect)
          return state
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

// const reducer = combineReducers({
//     taskstaskinfo:taskstaskinfo,
//     refresh:refresh,
//     select:select,
// })
function reducer(state, action) {
  return {
      tasksInfo: tasksInfo(state.tasksInfo, action),
      refresh: refresh(state.refresh, action),
  }
}
export default reducer
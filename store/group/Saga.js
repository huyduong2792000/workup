
// import {
//     SET_CHECKLIST,
//     SAVE_CHECKLIST,
//     SAVE_CHECKLIST_SUCCESS,
//     SAVE_CHECKLIST_FAIL,
//     GET_CHECKLIST,
//     ADD_TASKINFO} from './ActionType' 
// import { put, call } from 'redux-saga/effects' 
// import BaseApi from 'common/BaseApi'
// import {DeviceEventEmitter} from 'react-native'
// import {setGroup} from 'store/group/Actions' 
// export function* getChecklist(action){ 
//     try {        
//         const data = yield BaseApi({collectionName:'checklist'}).get({id:action.data})
//         yield put({type:SET_CHECKLIST,data})                
//     } catch (e) {                 
//         DeviceEventEmitter.emit('showToast', { text: 'Đã có lỗi xảy ra ',type:'danger' }) 
//     }
// }
// export function* saveChecklist (action) {             
//     try {        
//         if(action.data.checklist_name != ''){
//             const data = yield BaseApi({collectionName:'checklist'}).save(action.data)            
//             yield call(getChecklist,{data:data.id})
//             yield put({ type: SAVE_CHECKLIST_SUCCESS, data }) 
//         }else{
//             DeviceEventEmitter.emit('showToast', { text: 'Tên checklist không được để trống',type:'warning' })
//         }      
//     } catch (e) {         
//         yield put({ type: SAVE_CHECKLIST_FAIL }) 
//     }
// }

// export function* addTaskInfo(action){     
//     try { 
//         if(action.data.task_info_name === ''){
//             DeviceEventEmitter.emit('showToast', { text: 'Tên việc không được để trống',type:'warning' })
//         }else{                           
//             let task_info = yield BaseApi({collectionName:'taskinfo'}).post(action.data)            
//             yield put(setGroup(task_info.group))
//             yield call(getChecklist,{data:action.data.checklist_id})  
//         }            
//     } catch (e) {                 
//         DeviceEventEmitter.emit('showToast', { text: 'Đã có lỗi xảy ra khi tạo việc',type:'danger' }) 
//     }
// }
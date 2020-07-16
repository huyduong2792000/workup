import {
    SET_CURRENT_TASK,
    SELECT_SINGLE_ASSIGNEE,
    SELECT_MULTIPLE_FOLLOWERS,
    SAVE_CURRENT_TASK
} from './ActionType'
import { put, call } from 'redux-saga/effects' 
import BaseApi from 'common/BaseApi'
import {DeviceEventEmitter} from 'react-native'
// import {setGrousetCurrentTaskpSuggest} from 'store/group/Actions' 
export function* getCurrentTask(action){ 
    try {                
        const response = yield (BaseApi({collectionName:'task'}).get({id:action.data}))        
        yield put({type:SET_CURRENT_TASK,data:response.data})                
    } catch (e) {                 
        DeviceEventEmitter.emit('showToast', { text: 'Đã có lỗi xảy ra ',type:'danger' }) 
    }
}
export function* saveCurrentTask (action) {             
    try {        
        if(action.data.task_name != ''){
            const data = yield BaseApi({collectionName:'save_task'}).save(action.data)
            console.log(data);
                        
            yield call(getChecklist,{data:data.id})
            // yield put({ type: SAVE_CHECKLIST_SUCCESS, data }) 
        }else{
            DeviceEventEmitter.emit('showToast', { text: 'Tên việc không được để trống',type:'warning' })
        }      
    } catch (e) {         
        DeviceEventEmitter.emit('showToast', { text: 'Đã có lỗi xảy ra',type:'danger' })
    }
}

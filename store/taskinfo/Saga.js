import {
    SET_TASK_INFO,
    SAVE_TASK_INFO,
    GET_TASK_INFO
} from './ActionType'
import { put, call } from 'redux-saga/effects' 
import BaseApi from 'common/BaseApi'
import {DeviceEventEmitter} from 'react-native'
import {setTaskInfo} from 'store/taskinfo/Actions' 
export function* getTaskInfo(action){ 
    try {        
        const response = yield call(BaseApi({collectionName:'task_info'}).get({id:action.data}))
        yield put(setTaskInfo(response.data))                
    } catch (e) {                 
        DeviceEventEmitter.emit('showToast', { text: 'Đã có lỗi xảy ra ',type:'danger' }) 
    }
}
export function* saveTaskInfo(action){             
    try {        
        if(action.data.checklist_name != ''){
            const data = yield BaseApi({collectionName:'checklist'}).save(action.data)            
            yield call(getChecklist,{data:data.id})
            yield put({ type: SAVE_CHECKLIST_SUCCESS, data }) 
        }else{
            DeviceEventEmitter.emit('showToast', { text: 'Tên checklist không được để trống',type:'warning' })
        }      
    } catch (e) {         
        yield put({ type: SAVE_CHECKLIST_FAIL }) 
    }
}

import { takeEvery } from 'redux-saga/effects'
import {saveChecklist,getChecklist,addTaskInfo} from './checklist/Saga'
import {SAVE_CHECKLIST,GET_CHECKLIST,ADD_TASKINFO} from './checklist/ActionType'
import {SAVE_CURRENT_TASK} from './task/ActionType'
import {saveCurrentTask} from './task/Saga'
export default function* rootSaga() {
    yield takeEvery(SAVE_CHECKLIST, saveChecklist) 
    yield takeEvery(GET_CHECKLIST, getChecklist) 
    yield takeEvery(ADD_TASKINFO,addTaskInfo)
    yield takeEvery(SAVE_CURRENT_TASK,saveCurrentTask)
}
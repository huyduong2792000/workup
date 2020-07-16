import * as ActionType from './ActionType'

import { combineReducers } from 'redux'
import {
    Group,
    MembersInSelect,
    currentGroupSelect,
    GroupSuggest
} from './group/Reducer'
import {currentTask, refershListTaskHomeScreen} from './task/Reducer'
import {Checklist} from './checklist/Reducer'
import {TaskInfo} from './taskinfo/Reducer'
const currentUser=(state={},action) => {
    switch(action.type){
        case ActionType.SET_CURRENT_USER:                              
            return action.data
        default:
            return state
    }
}

const reducer = combineReducers({
    Group,
    currentUser,
    MembersInSelect,
    currentGroupSelect,
    currentTask,
    Checklist,
    TaskInfo,
    GroupSuggest,
    refershListTaskHomeScreen
})

  export default reducer
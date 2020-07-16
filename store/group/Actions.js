
import {
    SET_GROUP,
    SET_SELECT_MULTIPLE_MEMBER,
    CLEAR_SELECT_MULTIPLE_MEMBER,
    SET_CURRENT_GROUP_SELECT,
    TOGGLE_MEMBER,
    SET_ROLE_MEMBER,
    SET_GROUP_SUGGEST
} from './ActionType'
export const setGroup=(data)=>{            
    return {type:SET_GROUP,data}
}
export const setSelectMutipleMember = (data) => {
    return {type:SET_SELECT_MULTIPLE_MEMBER,data}
}
export const clearSelectMutipleMember = () => {
    return {type:CLEAR_SELECT_MULTIPLE_MEMBER}
}
export const setCurrentGroup = (data) => {
    return {type:SET_CURRENT_GROUP_SELECT,data}
}
export const toggleMember = (data) => {
    return {type:TOGGLE_MEMBER,data}
}
export const setRoleMember = (data) => {
    return {type:SET_ROLE_MEMBER,data}
}
export const setGroupSuggest = (data) => {
    return {type:SET_GROUP_SUGGEST,data}
}
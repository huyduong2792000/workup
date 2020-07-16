import {
  SET_CURRENT_TASK,
  SELECT_SINGLE_ASSIGNEE,
  SELECT_MULTIPLE_FOLLOWERS,
  SAVE_CURRENT_TASK,
  REFERSH_LIST_TASK_HOME_SCREEN,
} from './ActionType';
export const setCurrentTask = (data) => {
  return {type: SET_CURRENT_TASK, data};
};
export const setSelectSingleAssignee = (data) => {
  return {type: SELECT_SINGLE_ASSIGNEE, data};
};
export const setSelectMultipleFollowers = (data) => {
  return {type: SELECT_MULTIPLE_FOLLOWERS, data};
};
export const saveCurrentTask = (data) => {
  return {type: SAVE_CURRENT_TASK, data};
};
export const refershListTaskHomeScreen = (data) => {    
    return {type:REFERSH_LIST_TASK_HOME_SCREEN,data}
}
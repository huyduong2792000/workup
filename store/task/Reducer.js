import {
  SET_CURRENT_TASK,
  SELECT_SINGLE_ASSIGNEE,
  SELECT_MULTIPLE_FOLLOWERS,
  REFERSH_LIST_TASK_HOME_SCREEN,
} from './ActionType';

const toArrayUnique = (data) => {
  var result = [];
  for (var i = data.length - 1; i > -1; --i) {
    var is_unique = true;
    for (var follower of result) {
      if (follower.id === data[i].id) {
        is_unique = false;
        break;
      }
    }
    if (is_unique) {
      result.push(data[i]);
    }
  }

  return result;
};
export const currentTask = (
  state = {assignee: {}, followers: [], status: 0, note: ''},
  action,
) => {
  switch (action.type) {
    case SET_CURRENT_TASK:
      return {...state, ...action.data};
    case SELECT_SINGLE_ASSIGNEE:
      return {...state, assignee: action.data,assignee_id: action.data.id};
    case SELECT_MULTIPLE_FOLLOWERS:
      var list_follower_add = [];
      var list_follower_remove = [];
      var new_followers = [];
      action.data.forEach((item, index) => {
        if (item.action == 'add_follower') {
          list_follower_add.push(item.data);
        } else {
          list_follower_remove.push(item.data);
        }
      });
      var merge_list_followr_add = toArrayUnique([
        ...state.followers,
        ...list_follower_add,
      ]);
      for (follower of merge_list_followr_add) {
        if (
          list_follower_remove.findIndex((item) => item.id == follower.id) == -1
        ) {
          new_followers.push(follower);
        }
      }
      return {...state, followers: new_followers};
    default:
      return state;
  }
};

export const refershListTaskHomeScreen = (state = 0, action) => {
  switch (action.type) {
    case REFERSH_LIST_TASK_HOME_SCREEN:
        
      return state + 1;
    default:
      return state;
  }
};

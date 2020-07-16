import {
    SET_GROUP,
    SET_SELECT_MULTIPLE_MEMBER,
    CLEAR_SELECT_MULTIPLE_MEMBER,
    SET_CURRENT_GROUP_SELECT,
    TOGGLE_MEMBER,
    SET_ROLE_MEMBER,
    SET_GROUP_SUGGEST
} from './ActionType'

const init_state = {
    id:null,
    group_name:null,
    description:null,
    total_members:0,
    total_tasks_info:0,
    total_admins:0,
    first_five_admins:[]
}
export function Group(state=init_state,action){
    switch(action.type){
        case SET_GROUP:                    
            return {...state,...action.data}
        // case SET_ROLE_MEMBER:
        //     var new_members = state.members
        //     for(var i in state.members){
        //         if(state.members[i].info.id == action.data.info.id){
        //             new_members[i].role_name = action.data.role_name
        //             return {...state,members:new_members}
        //         }
        //     }
        //     return state
        // case TOGGLE_MEMBER:
        //     var index_of_action_data = state.members.findIndex((item,index) => {
        //         return item.info.id == action.data.info.id
        //     })
        //     if(index_of_action_data == -1){
        //         var new_members = state.members
        //         new_members.push(action.data)                             
        //         return {...state,members:new_members}
        //     }else{
        //         new_members = state.members
        //         new_members.splice(index_of_action_data,1)
        //         return {...state,members:new_members}
        //     }
        default:
            return state
    }
}

export const currentGroupSelect = (state={id:null,group_name:''},action) => {
    switch(action.type){
        case SET_CURRENT_GROUP_SELECT:
            return {...state,...action.data}
        default:
            return state
    }
}
export const MembersInSelect = (state=[],action) => {
    switch(action.type){
        case SET_SELECT_MULTIPLE_MEMBER: 
            // let new_state = [...state]
            // new_state.push(action.data)
            // return new_state
            index_of_action_data = state.findIndex((item,index) => {
                return item.phone == action.data.phone
            })
            if(index_of_action_data == -1){
                var new_state = [...state]
                new_state.push(action.data)                             
                return new_state
            }else{
                new_state = [...state]
                new_state.splice(index_of_action_data,1)
                return new_state
            }
        case CLEAR_SELECT_MULTIPLE_MEMBER:
            new_state = [...state]
            new_state.length = 0
            return new_state
        default:
            return state
    }
}
export function GroupSuggest(state={id:null,group_name:null},action){
    switch(action.type){
        case SET_GROUP_SUGGEST:                    
            return {...state,...action.data}
        default:
            return state
    }
}
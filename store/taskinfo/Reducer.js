import {
    SET_TASK_INFO,
    SELECT_MULTIPLE_FOLLOWERS_TASKINFO,
    SELECT_SINGLE_ASSIGNEE_TASKINFO
} from './ActionType'

const init_state = {
        task_info_name:null,
        assignee_id:null,
        assignee:{},
        group:{},
        checklist:{},
        followers:[]
    }

    const toArrayUnique = (data) => {
        var result = []        
        for (var i = data.length-1 ; i>-1 ; --i){            
            var is_unique = true
            for (var follower of result){
                if(follower.id === data[i].id){
                    is_unique = false
                    break
                }
            }
            if(is_unique){
                result.push(data[i])
            }
        }
    
        return result;
    };
export function TaskInfo(state=init_state,action){
    
    switch(action.type){
        case SET_TASK_INFO:                                                
            return {...state,...action.data}
        case SELECT_SINGLE_ASSIGNEE_TASKINFO:            
            return {...state,assignee:action.data,assignee_id:action.data.id}
        case SELECT_MULTIPLE_FOLLOWERS_TASKINFO:  
            var list_follower_add = []          
            var list_follower_remove = []
            var new_followers = []
            action.data.forEach((item,index)=>{
                if(item.action == 'add_follower'){
                    list_follower_add.push(item.data)
                }else{
                    list_follower_remove.push(item.data)
                }
            })
            var merge_list_follower_add = toArrayUnique([...state.followers,...list_follower_add])
            for(follower of merge_list_follower_add){
                if(list_follower_remove.findIndex((item)=>item.id == follower.id) == -1){
                    new_followers.push(follower)
                }
            }                        
            return {...state,followers:new_followers}
        default:
            return state
    }
}

import axios from 'axios'
import { Alert } from 'react-native'
// console.log(BASE_URL);
// export Group axios.create({
//     baseURL:BASE_URL+'/api/v1/Group',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     }
// })
// const baseURL = BASE_URL+'/api/v1/task_info'
// task_group?page=1&results_per_page=15&q={"order_by":[{"field":"created_at","direction":"desc"}]}
const getGroup =async (id,page=1,results_per_page=20,order_by={},filters={})=>{
    let query = {"filters":filters,"order_by":order_by}
    if (!id){        
        id=''
    }else{
        id='/'+id
    }
    var url =  baseURL+id+ `?page=${page}&results_per_page=${results_per_page}&q=${JSON.stringify(query)}`    
    const response = await axios.get(url).catch(
        (error) => {
            console.log('error');
        }
    )    

    return response.data
}
const postGroup =async (data)=>{
    const response = await axios.post(baseURL,data).catch(
        (error) => {
            console.log('error');
        }
    )    
    return response.data
}
const putGroup =async (data)=>{
    const response = await axios.put(baseURL+'/'+data.id,data).catch(
        (error) => {
            console.log('error');
        }
    )    
    return response.data
}
const saveGroup =(data)=>{
    if(data.id == null){
        postGroup(data)
    }else{
        putGroup(data)
    }
}
export default {getGroup,saveGroup}

import React,{useEffect,useState,useCallback} from 'react'
import { StyleSheet, Text, View,FlatList,DeviceEventEmitter } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import {setSelectMultipleFollowersTaskinfo} from 'store/taskinfo/Actions'
import ItemViewUser from 'components/user/ItemViewUser'
import BaseApi from 'components/common/BaseApi'
import DumbSelectFollowersScreen from './DumbSelectFollowersScreen'
const ContainerSelectFollowersTaskInfoScreen = ({navigation,route}) => {
    const dispatch = useDispatch()
    const task_info = useSelector(state => state.TaskInfo)
    const current_group_select = useSelector(state => state.currentGroupSelect)
    const [list_members,setListMembers] = useState([])
    const [followers_selecting,setFollowersSelecting] = useState([])
    
    navigation.setOptions({
        headerRight: () => (
            <Text 
            style={{color:'blue',marginRight:10,fontSize:18}}
            onPress={() => {
                var unique_follower = toArrayUnique(followers_selecting)
                dispatch(setSelectMultipleFollowersTaskinfo(unique_follower))
                navigation.goBack()
            }}>Lưu</Text>
        ),
    });
    const getMember = async () => {
        BaseApi({collectionName:'get_member'}).get({id:task_info.group_id?task_info.group_id:current_group_select.id}).then((response)=>{
            setListMembers(response.data.objects);
        }).catch ((error) => {
            DeviceEventEmitter.emit('showToast', { text: 'Đã có lỗi xảy ra ',type:'danger' }) 
        })
    }
    useEffect(()=>{
        getMember()
    },[])
    const toArrayUnique = (data) => {
        var result = []        
        for (var i = data.length-1 ; i>-1 ; --i){            
            var is_unique = true
            for (var follower of result){
                if(follower.data.id === data[i].data.id){
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
    
    const onSelectFollower = useCallback((props) => {   
        var new_followers_selecting = [...followers_selecting]
        var new_follower = {}  
        if(!props.followed){
            new_follower = {data:props.data,action:'add_follower'}
            new_followers_selecting.push(new_follower)
            setFollowersSelecting([...new_followers_selecting])
        }else{
            new_follower = {data:props.data,action:'remove_follower'}
            new_followers_selecting.push(new_follower)
            setFollowersSelecting([...new_followers_selecting])
        }
        return 
    })
    return (
        <DumbSelectFollowersScreen
        data={list_members}
        onSelectFollower={onSelectFollower}
        dataCheckSelect={task_info.followers}
        ></DumbSelectFollowersScreen>
    )
}

export default ContainerSelectFollowersTaskInfoScreen

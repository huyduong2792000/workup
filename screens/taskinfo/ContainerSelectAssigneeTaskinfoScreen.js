import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList,DeviceEventEmitter } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import {setSelectSingleAssigneeTaskinfo} from 'store/taskinfo/Actions'
// import ItemViewAssignee from '../../components/task/ItemViewFollower'
import ItemViewUser from '../../components/user/ItemViewUser'
import BaseApi from 'components/common/BaseApi'
const ContainerSelectAssigneeTaskinfoScreen = ({navigation,route}) => {
    const dispatch = useDispatch()
    const task_info = useSelector(state => state.TaskInfo)
    const current_group_select = useSelector(state => state.currentGroupSelect)
    const [list_members,setListMembers] = useState([])
    const [assignee_selecting,setAssigneeSelecting] = useState(task_info.assignee || {})    
    navigation.setOptions({
        headerRight: () => (
            <Text 
            style={{color:'blue',marginRight:10,fontSize:18}}
            onPress={() => {
                dispatch(setSelectSingleAssigneeTaskinfo(assignee_selecting))
                navigation.goBack()
            }}>Lưu</Text>
        ),
    });
    const getMember = async () => {
        await BaseApi({collectionName:'get_member'}).get({id:task_info.group_id?task_info.group_id:current_group_select.id}).then((response)=>{
            setListMembers(response.data.objects);
        }).catch ((error) => {
            DeviceEventEmitter.emit('showToast', { text: 'Đã có lỗi xảy ra ',type:'danger' }) 
        })
    }
    useEffect(()=>{
        getMember()
    },[])
    
    return (
        <View style={{flex:1}}>
            <View>
                <FlatList
                data={list_members}
                extraData={assignee_selecting.id}
                renderItem={({item})=>{
                    return <ItemViewUser
                    data={item}
                    onSelect={({data})=>{setAssigneeSelecting(data)}}
                    dataCheckSelect = {[assignee_selecting]}
                    selectMode = "single"
                    ></ItemViewUser>
                }}
                ></FlatList>
            </View>
        </View>
    )
}

export default ContainerSelectAssigneeTaskinfoScreen

import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList,DeviceEventEmitter } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import {setSelectSingleAssignee} from '../../store/task/Actions'
// import ItemViewAssignee from '../../components/task/ItemViewFollower'
import ItemViewUser from '../../components/user/ItemViewUser'
import BaseApi from 'components/common/BaseApi'
const SelectFollowers = ({navigation,route}) => {
    const dispatch = useDispatch()
    const current_task = useSelector(state => state.currentTask)
    const [list_members,setListMembers] = useState([])
    const [assignee_selecting,setAssigneeSelecting] = useState(current_task.assignee || {})    
    navigation.setOptions({
        headerRight: () => (
            <Text 
            style={{color:'blue',marginRight:10,fontSize:18}}
            onPress={() => {
                dispatch(setSelectSingleAssignee(assignee_selecting))
                navigation.navigate('TaskDetailScreen')
            }}>Lưu</Text>
        ),
    });
    const getMember = async () => {
        BaseApi({collectionName:'get_member'}).get({id:current_task.group_id}).then((response)=>{
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

export default SelectFollowers

const styles = StyleSheet.create({})

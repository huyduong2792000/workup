import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList,DeviceEventEmitter } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import {setSelectMultipleFollowers} from 'store/task/Actions'
// import ItemViewAssignee from '../../components/task/ItemViewFollower'
import ItemViewUser from 'components/user/ItemViewUser'
import BaseApi from 'components/common/BaseApi'
const SelectFollowers = ({navigation,route}) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser)
    const current_task = useSelector(state => state.currentTask)
    const current_group_select = useSelector(state => state.currentGroupSelect)
    const [list_members,setListMembers] = useState([])
    const [followers_selecting,setFollowersSelecting] = useState([])
    
    navigation.setOptions({
        headerRight: () => (
            <Text 
            style={{color:'blue',marginRight:10,fontSize:18}}
            onPress={() => {
                var unique_follower = toArrayUnique(followers_selecting)
                dispatch(setSelectMultipleFollowers(unique_follower))
                navigation.goBack()
            }}>Lưu</Text>
        ),
    });
    const getMember = async () => {
         await BaseApi({collectionName:'get_member'}).get({id:current_task.group_id}).then((response)=>{                                  
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
    
    const onSelectFollower = (props) => {   
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
    }
    return (
        <View style={{flex:1}}>
            <View>
                <FlatList
                data={list_members}
                renderItem={({item})=>{
                    return <ItemViewUser
                    data = {item}
                    onSelect = {(data)=>{onSelectFollower(data)}}
                    dataCheckSelect = {current_task.followers}
                    selectMode = "multiple"
                    ></ItemViewUser>
                }}
                ></FlatList>
            </View>
        </View>
    )
}

export default SelectFollowers

const styles = StyleSheet.create({})

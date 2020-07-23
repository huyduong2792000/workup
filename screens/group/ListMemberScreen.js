import React,{useState,useEffect,useMemo} from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity,ScrollView,DeviceEventEmitter } from 'react-native'
import ItemViewMenber from '../../components/group/ItemViewMenber'
import { useSelector,useDispatch } from 'react-redux'
import {toggleMember,setRoleMember} from '../../store/group/Actions'
import BaseApi from '../../components/common/BaseApi'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from 'constants/Colors'

const ListMemberScreen = ({navigation,route}) => {
    const group = useSelector(state => state.Group)
    const dispatch = useDispatch()
    const [list_member,setListMember] = useState({})   
    const [refresh,setRefresh] = useState(0)
    navigation.setOptions({
        headerRight: () => (
            <View style={{paddingHorizontal:10, position:'relative'}}>
                <AntDesign 
                onPress={()=>navigation.navigate('AddMemberFromContactsScreen',{id:null})}
                name='plus' 
                size={24} 
                color = {Colors.tintColor}
                style={{alignSelf:'center'}}
                ></AntDesign>
            </View>
        ),
    });

    const groupbyRole = (data) => {        
        const member_groupby_role = {'admin':[],'member':[]}        
        for (var member of data){
            if(member_groupby_role[member.role_name] !== undefined){
                member_groupby_role[member.role_name].push(member)
            }else{
                member_groupby_role[member.role_name]=[member]
            }
        }
        setListMember({...list_member,...member_groupby_role})
    }
    const getMembers = async () => {
        await BaseApi({collectionName:'get_member'}).get({id:group.id}).then((response)=>{
            groupbyRole(response.data.objects)
        }).catch ((error) => {
            DeviceEventEmitter.emit('showToast', { text: 'Đã có lỗi xảy ra ',type:'danger' }) 
        })
    }
    useEffect(()=>{
        getMembers()
    },[refresh])

    return (
        <View style={{backgroundColor:'white',flex:1}}>
            <View style={{flex:1}}>
                <ScrollView>
            <View>
                <Text 
                style={styles.section_header}>Admin({list_member.admin?list_member.admin.length:0})</Text>
                <FlatList
                data={list_member.admin}
                renderItem={({item})=>{
                    return <ItemViewMenber
                    data_render={item}
                    onRefresh={()=>setRefresh(refresh+1)}
                    onSelect = {(data) => {                                                 
                        if(item.role_name == data.role_name){
                            dispatch(toggleMember(data))
                        }else{
                            dispatch(setRoleMember(data))
                        }
                    }}
                    ></ItemViewMenber>
                }}
                ></FlatList>
            </View>
            <View>
                <Text
                style={styles.section_header}>Thành viên({list_member.member!=undefined?list_member.member.length:0})</Text>
                <FlatList
                data={list_member.member}
                renderItem={({item})=>{
                    return <ItemViewMenber
                    data_render={item}
                    onRefresh={()=>setRefresh(refresh+1)}
                    onSelect = {(data) => {   
                        if(item.role_name == data.role_name){
                            dispatch(toggleMember(data))
                        }else{
                            dispatch(setRoleMember(data))
                        }
                    }}
                    ></ItemViewMenber>
                }}
                ></FlatList>
            </View>
            </ScrollView>
            </View>
        </View>
    )
}

export default ListMemberScreen

const styles = StyleSheet.create({
    section_header:{
        paddingLeft: 10,
        backgroundColor: '#f1f2f3',
        paddingVertical: 5,
        // fontSize:18,
        color:'blue',
        fontWeight:'bold',
        fontSize:16
    }
})

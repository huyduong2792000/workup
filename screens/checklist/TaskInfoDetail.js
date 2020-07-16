import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,TextInput,FlatList,Dimensions,TouchableOpacity,TouchableWithoutFeedback,Keyboard } from 'react-native'
import BaseApi from 'common/BaseApi'
import DateTimePickerField from 'components/task/DateTimePickerField'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { useSelector,useDispatch } from 'react-redux'
import {setGroupTask} from '~/store/taskinfo/Actions'
import moment from 'moment'
import Colors from 'constants/Colors'
import AddTaskInfo from 'components/checklist/AddTaskInfo'
import ListTaskInfo from 'components/checklist/ListTaskInfo'
const WIDTH = Dimensions.get('window').width

const TaskGroupDetail = ({navigation,route}) => {
    const id= route.params?route.params.id:null
    const [visibleDateTime,setVisibleDateTime] = useState(0)
    const currentUser = useSelector(state => state.currentUser)
    const GroupTask = useSelector(state => state.GroupTask)
    const dispatch = useDispatch()
    navigation.setOptions({
        headerRight: () => (
        <View style={{paddingHorizontal:10, position:'relative'}}>
            <Text style={{fontSize:15,color:Colors.tintColor}}>Lưu</Text>
        </View>
        ),
    }); 
    useEffect(() => {
        if(id){
            BaseApi({collectionName:'task'}).get({id:id}).then((response)=>{     
                dispatch(setGroupTask(response.data))
            })
        }
    },[])
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
            <View style={styles.container}>
                <View style={styles.content}>
                    {/* task group name */}
                    <View style={GroupTask.id!=null?{...styles.group_task_name}:{display:'none'}}>
                        <TextInput
                        style={{fontWeight:'bold',fontSize:20,alignItems:'center',flex:1}}
                        value={GroupTask.group_task_name}
                        onChangeText={(term)=>{
                            dispatch(setGroupTask({group_task_name:term}))
                        }}
                        ></TextInput>
                        {/* <Text style={{fontWeight:'bold',fontSize:20,alignItems:'center'}}>{GroupTask.group_task_name}</Text> */}
                    </View>
                    {/* input task group name  */}
                    <View style={GroupTask.id==null?{...styles.input_group_task_name}:{display:'none'}}>
                        <TextInput
                        style={{fontSize:20,fontWeight:'bold',alignItems:'center'}}
                        value={GroupTask.group_task_name}
                        // autoFocus={true}
                        placeholder={'Nhập tên nhóm việc'}
                        onChangeText={(term)=>{
                            dispatch(setGroupTask({group_task_name:term}))
                        }}

                        ></TextInput>
                    </View>
                    {/* assign name */}
                    <View style={styles.attribute_field}>
                        <Ionicons style={styles.iconLeft} name='ios-person' size={18}></Ionicons>
                        <View style={styles.attribute_field_text}>
                            <TouchableOpacity style={{flex:1}} onPress={()=>{
                                navigation.navigate('SelectAssignee')
                            }}>
                            <Text style={styles.text}>{Object.keys(GroupTask.assignee).length != 0?GroupTask.assignee.display_name:'chưa có ai nhận'}</Text>
                            </TouchableOpacity>
                            <AntDesign onPress={()=>{
                                if( GroupTask.assignee != null ){
                                    dispatch(setGroupTask({assignee:null,assignee_id:null}))
                                }else{
                                    navigation.navigate('SelectAssignee')
                                }
                            }} name={GroupTask.assignee != null?'close':'right'} style={styles.iconRight}></AntDesign>
                        </View>
                    </View>
                    {/* list task info */}
                    <ListTaskInfo></ListTaskInfo>
                </View>
                <AddTaskInfo></AddTaskInfo>
            </View>
        
        </TouchableWithoutFeedback>
    )
}

export default TaskGroupDetail

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:10,
        // paddingHorizontal:10,
        backgroundColor:'white',
        position:'relative'
    },
    content:{
        paddingHorizontal:10,
        flex:1
    },
    group_task_name:{
        flexDirection:'row'
    },
    iconLeft:{
        alignSelf:'center',
        paddingRight:10
    },
    attribute_field:{
        flexDirection:'row',
    },
    attribute_field_text:{
        flex:1,
        paddingVertical:15,
        borderBottomWidth:0.6,
        borderColor:'#CFCFCF',
        position:'relative',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    iconRight:{
        alignSelf:'center',
        color:'gray',
        paddingHorizontal:5,
        fontSize:16
    },
    text:{
        fontSize:18,
        padding:2,
    },
    input_group_task_name:{
        height:25,
        padding:0,
        justifyContent:'center'
    },
})


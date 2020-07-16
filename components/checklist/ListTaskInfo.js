import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,TextInput,FlatList,Dimensions,TouchableOpacity,TouchableWithoutFeedback,Keyboard } from 'react-native'
import ItemViewTaskInfo from './ItemViewTaskInfo'
import {addTaskInfo} from 'store/checklist/Actions'
import AddTaskInfo from './AddTaskInfo'
export default function ListTaskInfo({data_render}) {
    // const currentUser = useSelector(state => state.currentUser)
    // const Checklist = useSelector(state => state.Checklist)
    // const dispatch = useDispatch()    
    // console.log(data_render.task_info_name);
    
    return (
        <View style={styles.container}>
            <View style={styles.list_task}>
                <FlatList
                data={data_render}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,index)=>JSON.stringify(index)}
                renderItem={({item})=>{
                return <ItemViewTaskInfo data={item}></ItemViewTaskInfo>
                }}
                ></FlatList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        paddingLeft:10,
    },
    list_task:{
        // flex:1
    },
    add_task_container:{
        backgroundColor:'#DDDDDD',
        padding:5,
        height:50,
        flexDirection:'row',
        alignItems:'center'
    },
    add_task:{
        // paddingVertical:10
        backgroundColor:'white',
        padding:8,
        borderRadius:20,
        marginHorizontal:5,
        flexDirection:'row',
        flex:1
        // width:'100%'
    },
    add_task_icon:{
        alignSelf:'center',
        paddingHorizontal:10,
        color:'gray'
    },
})

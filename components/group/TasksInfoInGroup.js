import React from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import ItemViewTaskInfo from './ItemViewTaskInfo'
export default function TasksInfoInGroup(){
    const group = useSelector(state => state.Group)
    // console.log(group);
    
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <FlatList
                data={group.tasks_info}
                keyExtractor={(item,index)=>JSON.stringify(index)}
                renderItem={({item})=>{
                    return (
                        <ItemViewTaskInfo
                        data={item}
                        ></ItemViewTaskInfo>
                    )
                }}
                ></FlatList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingHorizontal: 15,
    },
    content:{
        flex:1
    }
})

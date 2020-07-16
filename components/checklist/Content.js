import React from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native'
import { setChecklist } from 'store/checklist/Actions'
import { useSelector, useDispatch } from 'react-redux'
import ListTaskInfo from './ListTaskInfo'
import Colors from 'constants/Colors'
import AddTaskInfo from './AddTaskInfo'
import { useNavigation } from '@react-navigation/native';

// import Colors from 'constants/Colors'
const Content = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const Checklist = useSelector(state => state.Checklist)

    const groupbyGroup = () => {
        // Checklist.tasks_info.forEach((item,index)=>{
        //     console.log(item.task_info_name,item.group_id);
        // })
        // console.log("======");

        let result = { groups_groupby: [], tasks_info_groupby: [] }
        Checklist.tasks_info.forEach((task_info, index_task_info) => {
            let task_info_add = { ...task_info }
            let index_match = -1
            delete task_info_add.group
            delete task_info_add.group_id
            // console.log(task_info.group_id);

            if (task_info.group_id) {
                result.groups_groupby.forEach((group, index_group) => {
                    if (group.id === task_info.group_id) {
                        result.groups_groupby[index_group].tasks_info.push(task_info_add)
                        index_match = index_group
                    }
                })
                if (index_match === -1) {
                    let new_group = {}
                    new_group = task_info.group
                    new_group.tasks_info = []
                    new_group.tasks_info.push(task_info_add)
                    result.groups_groupby.push(new_group)
                }
                index_match = -1
            } else {
                result.tasks_info_groupby.push(task_info_add)
            }
        })
        // console.log(result.tasks_info_groupby.length);

        return result

    }
    return (
        <View style={styles.container}>
            {/* <> */}
            <FlatList
            keyExtractor={(item,index)=>JSON.stringify(index)}
            showsVerticalScrollIndicator={false}
            data={[
            <Text style={{fontWeight:'bold',fontSize:20,paddingHorizontal:10}}>Tất cả công việc</Text>,
            <ListTaskInfo
                data_render={groupbyGroup().tasks_info_groupby}
            ></ListTaskInfo>,
            <FlatList
                data={groupbyGroup().groups_groupby}
                keyExtractor={item=>item.id}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{paddingHorizontal:10}}>
                            <TouchableOpacity 
                            onPress={()=>navigation.navigate('GroupDetailScreen',{id:item.id})}
                            style={{ flexDirection: 'row', borderBottomWidth:Platform.OS === 'ios' ? 0.3 : 0.4, }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingVertical:5,color:Colors.tintColor }}>{item.group_name}</Text>
                            </TouchableOpacity>
                            <View>
                                <ListTaskInfo
                                    data_render={item.tasks_info}
                                ></ListTaskInfo>
                            </View>
                        </View>
                    )
                }}
            ></FlatList>
            ]}
            renderItem={({item})=>{
                return item
            }}
            ></FlatList>
            
            {/* </ScrollView> */}
            <AddTaskInfo></AddTaskInfo>
        </View>
    )
}

export default Content

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 18,
        color: Colors.tintColor,
        paddingVertical: 10
    }
})

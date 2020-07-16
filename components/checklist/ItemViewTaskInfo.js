import React from 'react'
import { StyleSheet, Text, View,Platform,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function ItemViewTaskInfo({data}) { 
    const navigation = useNavigation()   
    return (
        <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('TaskInfoDetailScreen',{id:data.id})}>
            <View style={styles.task_info_name_container}>
                <Text style={styles.task_info_name}>{data.task_info_name}</Text>
                {data.assignee&&
                <View style={styles.assignee_container}>
                    <Text style={styles.assignee_name}>{data.assignee.display_name}</Text>
                </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingVertical:15,
        borderBottomWidth:Platform.OS === 'ios' ? 0.3 : 0.4,
        borderColor:'#F1F1F1',
    },
    task_info_name:{
        fontSize:17,
        // fontWeight:'bold'
    },
    assignee_name:{
        color:'gray'
    },
    group_name:{
        color:'#D5DBDB'
    },
    task_info_name_container:{

        // flex:1
    }
})

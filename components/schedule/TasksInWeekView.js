import React from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import TasksInDayView from './TasksInDayView'
const TasksInWeekView = ({tasksInWeek}) => {
    // console.log(tasksInWeek);
    
    return (
        <View style={styles.container}>
            <FlatList
            data={tasksInWeek.tasks_in_week}
            renderItem={({item})=>{
                return <TasksInDayView
                        taskInDay={item}
                        ></TasksInDayView>
            }}
            ></FlatList>
        </View>
    )
}

export default TasksInWeekView

const styles = StyleSheet.create({
    container:{
        alignSelf:'flex-start',
        width:'100%'
    },
    week_title:{
        width:'100%',
        backgroundColor:'rgba(25,25,25,0.3)',
    }
})

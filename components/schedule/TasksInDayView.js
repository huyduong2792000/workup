import React from 'react'
import { StyleSheet, Text, View,FlatList,Dimensions } from 'react-native'
import DateTimePickerField from '../common/DateTimePickerField'
const WIDTH = Dimensions.get('window').width
const TasksInDayView = ({taskInDay}) => {
    return (
        <View>
        <View>
            <Text>Thứ: {taskInDay.day_of_week}</Text>
        </View>
            <FlatList
            data={taskInDay.tasks_in_day}
            renderItem={({item})=>{
                return (<View>
                        <DateTimePickerField
                        styles={styleField}
                        showDate={true}
                        // showTime={true}
                        displayMode='spinner'
                        format="DD/MM/YYYY"
                        valid = {true}
                        title='Birthday'
                        placeholder="Birthday"
                        value={null}
                        onChangeText={(term)=>{}}
                        ></DateTimePickerField>
                        <Text>{item.start_hours_working} - {item.end_hours_working}</Text>
                        </View>)
            }}
            ></FlatList>
        </View>
    )
}

export default TasksInDayView

const styles = StyleSheet.create({})
const styleField = StyleSheet.create({
    inputContainer:{
        marginTop:20,
    },
    title:{
        fontSize:13,
        marginBottom:5
    },
    input:{
        height:24,
        borderBottomWidth:1,
        borderBottomColor:'gray',
        width:WIDTH-50,
        fontSize:18,
        lineHeight:24
    }
})
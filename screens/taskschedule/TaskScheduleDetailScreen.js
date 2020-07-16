import React,{useReducer,useState,useEffect} from 'react'
import { StyleSheet, Text, View,Dimensions,Button,FlatList } from 'react-native'
import DateTimePickerField from '../../components/common/DateTimePickerField'
import reducer from '../../components/schedule/Reducer'
import {setSchedule,setScheduleDetail,addScheduleDetail,deleteScheduleDetail,refresh} from '../../components/schedule/Actions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DetailView from '../../components/schedule/DetailView'
import BaseApi from '../../components/common/BaseApi'
import Validate from '../../components/common/Validate'

const WIDTH = Dimensions.get('window').width
import axios from 'axios'

const TaskScheduleDetailScreen = ({route,navigation}) => {
    // const id= route.params.id    
    const id = "61703e31-26a5-4d16-a172-4d24ca75c3cb"
    const [state,dispatch] = useReducer(reducer,{schedule:{},repeat:true,refresh:0})
    navigation.setOptions({
        headerRight: () => (
          <Button onPress={() => {
            if(state.schedule.start_time_working!=0&&state.schedule.end_time_working!=0){
                saveProcess()}  
            }} title="save" />
        ),
      });

    const saveProcess=async ()=>{
        await BaseApi({collectionName:'task_schedule'}).save(state.schedule)
        // route.params.callback?route.params.callback():null
        navigation.goBack()
    }
    // const getTaskSchedule=async (id)=>{
    //     await axios.get(BASE_URL+'/api/v1/get_task_schedule',{
    //         params:{
    //             id:id
    //         }
    //     }).then((response)=>{
    //         const data = response.data            
    //         dispatch(setSchedule(data))
    //     }).catch(function (error) {
    //         console.log("error");
    //       });
    // }
    useEffect(()=>{
        if(id!=null){  
            getTaskSchedule(id)
        }
    },[])
    return (
        <View style={styles.container}>
        <DateTimePickerField
            styles={styleField}
            showDate={true}
            showTime={true}
            format="DD/MM/YYYY hh:mm:ss a"
            // valid = {true}
            title='Start time'
            placeholder="Start time"
            value={state.schedule.start_time_working!=null?state.schedule.start_time_working:null}
            onChangeText={(term)=>{dispatch(setSchedule({start_time_working:term}))}}
        ></DateTimePickerField>
        <DateTimePickerField
            styles={styleField}
            showDate={true}
            showTime={true}
            format="DD/MM/YYYY hh:mm:ss a"
            // valid = {true}
            title='End time'
            placeholder="End time"
            value={state.schedule.end_time_working!=null?state.schedule.end_time_working:null}
            onChangeText={(term)=>{dispatch(setSchedule({end_time_working:term}))}}
        ></DateTimePickerField>
        <Text style={{fontWeight:'bold',width:WIDTH-50}}>detail</Text>

        <FlatList
        data={state.schedule.task_scheduledetail||[]}
        keyExtractor={(item,index)=>index}
        ListEmptyComponent={()=>{return <Text>Chưa có công việc nào </Text>}}
        renderItem={({item,index})=>{
            return  <DetailView 
            data={{"data_detail":item,"index":index,"refresh":state.refresh}}
            refresh={()=>dispatch(refresh())}
            setScheduleDetail={(data)=>dispatch(setScheduleDetail(data))}
            deleteScheduleDetail={(data)=>dispatch(deleteScheduleDetail(data))}
            ></DetailView>
        }}
        ></FlatList>
        <View><Text onPress={()=>{dispatch(addScheduleDetail())}} style={styles.add_scheduledetail}>+ Thêm</Text></View>
        </View>
    )
}

export default TaskScheduleDetailScreen

const styles = StyleSheet.create({
    container:{
        // flex:1,
        // flexDirection:'column',
        alignItems:'center',
        // paddingVertical:50
    },
    selectContainer:{
        width:WIDTH-50,
        flexDirection:'row',
        marginTop:10,
    },
    repeat:{
        fontSize:18,
    },
    add_scheduledetail:{
        borderColor:'blue',
        color:'red',
        borderWidth:1,
        padding:2,
    }

})
const styleField = StyleSheet.create({
    inputContainer:{
        marginTop:20,
        display:'flex'
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
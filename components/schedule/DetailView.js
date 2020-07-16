import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,FlatList,Dimensions } from 'react-native'
import TasksInWeekView from './TasksInWeekView'
import DateTimePickerField from '../common/DateTimePickerField'
import moment from 'moment'
import ListTaskView from './ListTaskView'
const WIDTH = Dimensions.get('window').width

const DetailView = ({data,setScheduleDetail,addTaskinfo,subTaskinfo,refresh,deleteScheduleDetail}) => {
    const [data_detail,setDataDetail] = useState({})  
    const INDEX = data.index  
    
    useEffect(()=>{    
        const dataDetail = data.data_detail                             
        setDataDetail({...dataDetail})
    },[data.refresh])
    const setState = (data_set)=>{
        setDataDetail({...data_detail,...data_set})      
        setScheduleDetail({data_detail:{...data_detail,...data_set},INDEX})
    }
    const deleteTaskScheduleDetail = ()=>{
        deleteScheduleDetail(INDEX)
        refresh()
    }
    return (
        <View style={styles.container}>
            <View style={styles.hours_working}>
                <DateTimePickerField
                styles={styleField}
                // showDate={true}
                showTime={true}
                format="hh:mm"
                // valid = {true}
                title='giờ bắt đầu'
                placeholder="giờ bắt đầu"
                value={data_detail.start_hours_working!=null?data_detail.start_hours_working:null}
                onChangeText={(term)=>{ 
                    if(term!=0){
                        var start_hours_working = parseInt(moment.unix(term).format("HH")+moment.unix(term).format("mm"))                
                        setState({start_hours_working:start_hours_working})
                    }                               
                
                }}
                ></DateTimePickerField>
                <DateTimePickerField
                styles={styleField}
                // showDate={true}
                showTime={true}
                format="hh:mm"
                // valid = {true}
                title='giờ kết thúc'
                placeholder="giờ kết thúc"
                value={data_detail.end_hours_working!=null?data_detail.end_hours_working:null}
                onChangeText={(term)=>{ 
                    if(term!=0){
                        var end_hours_working = parseInt(moment.unix(term).format("HH")+moment.unix(term).format("mm"))                
                        setState({end_hours_working:end_hours_working})
                    }                               
                
                }}
                ></DateTimePickerField>
                <View><Text onPress={()=>{deleteTaskScheduleDetail()}}>Xóa</Text></View>
            </View>
            <Text style={{fontWeight:'bold'}}>Công việc</Text>
            <View style={styles.list_task}>
                <ListTaskView
                data={data_detail.tasks_info}
                setState={(data)=>setState(data)}
                ></ListTaskView>
            </View>
        </View>
    )
}

export default DetailView

const styles = StyleSheet.create({
    container:{
        width:WIDTH-50,
        marginTop:10,
        // flex:1,
        flexDirection:'column'
    },
    hours_working:{
        flexDirection:'row',
        justifyContent:'center'
    }
})
const styleField = StyleSheet.create({
    inputContainer:{
        marginTop:20,
        marginHorizontal:10,
        justifyContent:'center',
        
    },
    title:{
        fontSize:13,
        marginHorizontal:0,
        paddingHorizontal:0,
        marginBottom:5
    },
    input:{
        height:24,
        borderBottomWidth:1,
        borderBottomColor:'gray',
        width:(WIDTH-50)/2-35,
        fontSize:18,
        lineHeight:24
    }
})
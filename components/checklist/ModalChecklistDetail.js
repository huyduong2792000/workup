import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Dimensions, ScrollView,FlatList } from 'react-native'
import Modal from 'react-native-modal';
import { useSelector,useDispatch } from 'react-redux'
import {setChecklist,saveChecklist} from 'store/checklist/Actions'
import ChecklistName from './ChecklistName'
import Schedule from './Schedule'
import Shift from './Shift'
const WIDTH = Dimensions.get('window').width
const ModalChecklistDetail = (props) => {
    const task_info = useSelector(state => state.TaskInfo)    
    const Checklist = useSelector(state => state.Checklist)   
    const currentGroupSelect = useSelector(state => state.currentGroupSelect)
 
    const {visible,setVisible} = {...props}   
    const dispatch = useDispatch()      
    const onSaveChecklist = () =>{
        let checklist_save = Checklist
        checklist_save.groups = [currentGroupSelect]
        // checklist_save.group_id = currentGroupSelect.id
        dispatch(saveChecklist(checklist_save))
        onDissmiss()
    }
    const onDissmiss=()=>{
        if(!Checklist.id){
            dispatch(setChecklist({
                id:null,
                checklist_name:'',
                note:'',
                cycle_worker:'week',
                days_worker_week:[0,1,2,3,4,5,6],
                days_worker_month:null,
                shifts: [
                    {shift_name:'Sáng',start_hour_working:0,end_hour_working:1200},
                    {shift_name:'Chiều',start_hour_working:1201,end_hour_working:2359}
                ],
                tasks_info: [],
                groups:[currentGroupSelect]
            }))
        }
        setVisible(!visible)
    }
    return (
        <Modal
            isVisible={visible}
            backdropColor='rgba(25,25,25,0.3)'
            onBackdropPress={() => {                
                onDissmiss()}}
            avoidKeyboard={true}
            style={{margin:0}}
            >
            <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>onDissmiss()} style={{flex:1}}></TouchableOpacity>
                <View style={styles.container}>
                    <FlatList
                    keyExtractor={(item,index)=>JSON.stringify(index)}
                    data={[<ChecklistName></ChecklistName>,<Shift></Shift>, <Schedule></Schedule>]}
                    renderItem={({item})=>{
                        return item
                    }}
                    ></FlatList>
                </View>
                <View style={styles.confirm_footer}>
                    <TouchableOpacity style={styles.more} onPress={()=>{
                        onDissmiss()
                    }}>
                        <Text style={{color:'gray',fontSize:16,paddingHorizontal:10}}>Quay Lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>{onSaveChecklist(task_info)}} 
                    style={styles.confirm_button}
                    >
                        <Text style={{color:'white',fontSize:18}}>Lưu Lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalChecklistDetail

const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:'white',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        marginBottom:50
    },
    confirm_footer:{
        height:50,
        borderTopWidth:0.6,
        borderColor:'#E1E1E1',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'white',
        paddingHorizontal:10,
        position:'absolute',
        bottom:0,
        width:'100%'
    },
    confirm_button:{
        paddingHorizontal:10,
        paddingVertical:2,
        backgroundColor:'#009BFF',
        borderRadius:3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2.22,
        elevation: 2,
    }
})

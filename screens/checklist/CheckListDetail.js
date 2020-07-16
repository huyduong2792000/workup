import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,TouchableHighlight,DeviceEventEmitter } from 'react-native'
import Content from 'components/checklist/Content'
import {saveChecklist,getChecklist,setChecklist} from 'store/checklist/Actions'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import BaseApi from 'common/BaseApi'
import { useSelector,useDispatch } from 'react-redux'
import Colors from 'constants/Colors'
// import Schedule from 'components/checklist/Schedule'
import ModalChecklistDetail from 'components/checklist/ModalChecklistDetail'
const CheckListDetail = ({navigation,route}) => {
    const id = route.params?route.params.id:null
    // const id = '70b74086-3d61-4333-851e-890744f54eb4'
    const dispatch = useDispatch()
    const Checklist = useSelector(state => state.Checklist)
    const [visible_modal_schedule,setVisibleModalSchedule] = useState(false)
    // navigation.setOptions({
    //     headerRight: () => (
    //         <View style={{paddingHorizontal:10}}>
    //             <AntDesign name="plus" size={20}></AntDesign>
    //         </View>
    //     ),
    // });
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {            
            if(id){
                dispatch(getChecklist(id))
            }else{
                dispatch(setChecklist({
                    id:null,
                    checklist_name:'',
                    note:'',
                    cycle_worker:'week',
                    days_worker_week:[0,1,2,3,4,5,6],
                    days_worker_month:[],
                    shifts: [
                        {shift_name:'Sáng',start_hour_working:0,end_hour_working:1200},
                        {shift_name:'Chiều',start_hour_working:1201,end_hour_working:2359}
                    ],
                    tasks_info: []
                }))
            }
        })
        return unsubscribe
    }, [])
    const onDeleteGroup = async () => {
        let checklist_save = {...Checklist}
        checklist_save.deleted = true
        try {        
            await BaseApi({collectionName:'checklist'}).save(checklist_save)      
            DeviceEventEmitter.emit('showToast', { text: 'Xóa thành công',type:'success' })
            navigation.goBack()
        } catch (e) {         
            DeviceEventEmitter.emit('showToast', { text: 'Đã có lỗi xảy ra',type:'danger' })

        }
    }
    navigation.setOptions({
        headerRight: () => (
            <View style={{paddingHorizontal:10, position:'relative'}}>
                {Checklist.id&&
                <Text 
                    onPress={()=>{onDeleteGroup()}} 
                    style={{fontSize:14,color:'red'}}>{"Xóa"}
                </Text>}
            </View>
        ),
    });
    return (
        <View style={styles.container}>
            <TouchableHighlight 
            activeOpacity={0}
            underlayColor='white'
            onPress={()=>setVisibleModalSchedule(!visible_modal_schedule)}>
                <View style={styles.checklist_header}>
                    <MaterialCommunityIcons name='clipboard-text-outline' size={50}></MaterialCommunityIcons>
                    <View style={{flexDirection:'column',paddingHorizontal:10,justifyContent:'center'}}>
                        <Text 
                        style={[
                            styles.checklist_name,
                            {color:Checklist.checklist_name&&Checklist.checklist_name!==''?'black':'#CFCFCF'}
                        ]}
                        >{Checklist.checklist_name&&Checklist.checklist_name!==''?Checklist.checklist_name:'Nhập tên checklist'}</Text>
                        <Text style={{color:'gray'}}>
                            {Checklist.shifts.length} ca làm việc,
                            lặp lại theo {Checklist.cycle_worker === "week"?"tuần":"tháng"}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
            <ModalChecklistDetail
            visible={visible_modal_schedule}
            setVisible={setVisibleModalSchedule}
            ></ModalChecklistDetail>
            <Content></Content>
            
        </View>
    )
}

export default CheckListDetail

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        // padding:10,
        backgroundColor:'white'
    },
    checklist_header:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:10
    },
    checklist_name:{
        fontWeight:'bold',
        fontSize:18
    },
    input_checklist:{
        fontWeight:'bold',
        flexDirection:'row',
        fontSize:18,
        justifyContent:'center',
        flex:1
    },
    content:{
        flex:1
    },

})

import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View,FlatList,TouchableOpacity,ScrollView,Modal,TouchableWithoutFeedback } from 'react-native'
import BaseApi from '../common/BaseApi'
import ItemViewUser from './ItemViewUser'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const SelectView = ({selectMode='multiple',data_render,callback,visible, setVisible}) => {
    const[employees,setEmployees] = useState([])
    const [refersh,setRefersh] = useState(false)
    const [employeesSelect,setEmployeesSelect] = useState([])
    // const [Visible, setVisible] = useState(visible);
    const navigation = useNavigation()
    // console.log(employeesSelect.length);
    
    useEffect(()=>{
        if(!data_render){
            BaseApi({collectionName:'user'}).get().then((response)=>{                            
                setEmployees(response.data.objects)
            })
        }else{
            setEmployees(data_render)
        }

    },[refersh])
    const onRefersh=()=>{
        // BaseApi({collectionName:'user'}).getEmployee().then((data)=>{
        //     setEmployees(data.objects)
            setRefersh(!refersh)
        // })
    }
    const onSelect=(data)=>{
        if (selectMode=='multiple'){
            const index_data = employeesSelect.findIndex((item,index)=>{
                return item.id==data.id
            })
            if (index_data==-1){
                setEmployeesSelect([...employeesSelect,data])
            }else{
                const new_employeesSelect = [...employeesSelect]
                new_employeesSelect.splice(index_data,1)
                setEmployeesSelect(new_employeesSelect)
            }
        }else if(selectMode=="single"){
            setEmployeesSelect(data)
        }
    }
    const onDelete=()=>{
        BaseApi({collectionName:'user'}).deleteEmployee(concat(employeesSelect))
    }
    const checkSelectDefault=(item)=>{
        const new_employees_select = [].concat(employeesSelect)
        if (new_employees_select.findIndex((employee)=>{return employee.id==item.id})!=-1){
            return true
        }else{
            return false
        }
    }
    return (
        <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        // onRequestClose={()=>{console.log('press')}}
        >
            {/*  */}
            {/* <TouchableWithoutFeedback style={{backgroundColor:'black'}} onPress={()=>setVisible(!visible)}>   */}
                <View style={styles.container}>
                    <View style={styles.content}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={async () => {
                                await onDelete()
                                onRefersh()
                            }}
                        >
                            <Text><FontAwesome5 style={{ color: '#9f0000' }} name="trash-alt" size={26}></FontAwesome5></Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => { navigation.navigate('EmployeeDetailScreen', { 'id': null, callback: ()=>onRefersh }) }}
                        >
                            <Text><AntDesign style={{ color: 'blue' }} name="adduser" size={30}></AntDesign></Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scroll}>
                        <FlatList
                            data={employees}
                            // refreshing={refersh}
                            // onRefersh={()=>{onRefersh()}}
                            // extraData={employees}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {                                
                                return <ItemViewUser 
                                selectDefault={checkSelectDefault(item)
                                } onSelect={onSelect} 
                                callback={onRefersh} 
                                data_render={item}>
                                </ItemViewUser>
                            }}
                        ></FlatList>
                    </ScrollView>
                        <View style={styles.selectBar}>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={async () => {
                                    setVisible(!visible)
                                }}
                            >
                                <Text style={{color:'#c2c2d6'}}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => {
                                    callback(employeesSelect)
                                    setVisible(!visible)
                                }}
                            >
                                <Text style={{color:'#0099e6'}}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            {/* </TouchableWithoutFeedback> */}
        </Modal>
    )
}

export default SelectView

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(25,25,25,0.8)',
        padding:30,
        // margin:30
        // height:500
    },
    content:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:10,
        // height:600
    },
    header:{
        // flexGrow:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        height:40
        // marginVertical:5,
        // paddingVertical:5
    },
    scroll:{
        // flexGrow:20
        flex:1
    },
    selectBar:{
        // flexGrow:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        height:50
    },
    addButton:{
        alignSelf:'center',
        height:30,
        lineHeight:30,
        padding:3,
        marginRight:25,
    },
    modalContainer:{
    }

})

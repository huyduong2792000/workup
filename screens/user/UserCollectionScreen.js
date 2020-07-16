import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity,ScrollView,SafeAreaView } from 'react-native'
import BaseApi from '../../components/common/BaseApi'
import ItemViewUser from '../../components/user/ItemViewUser'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const EmployeeCollectionScreen = ({route,navigation,selectMode='multiple'}) => {
    const[employees,setEmployees] = useState([])
    const [refersh,setRefersh] = useState(false)
    const [employeesSelect,setEmployeesSelect] = useState([])

    useEffect(()=>{
        BaseApi({collectionName:'user'}).get().then((response)=>{            
            setEmployees(response.data.objects)
        })
        },[refersh])
    const onRefersh=()=>{
        // EmployeeApi.getEmployee().then((data)=>{
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
        BaseApi({collectionName:'user'}).deleteMutiple(concat(employeesSelect))

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
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={async()=>{
                        await onDelete()
                        onRefersh()}}
                    >
                    <Text><FontAwesome5 style={{color:'#9f0000'}} name="trash-alt" size={26}></FontAwesome5></Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={()=>{navigation.navigate('EmployeeDetailScreen', { 'id': null,callback:onRefersh })}}
                    >
                    <Text><AntDesign style={{color:'blue'}} name="adduser" size={30}></AntDesign></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listEmployee}>
                <ScrollView>
                    <FlatList
                    data = {employees}
                    // refreshing={refersh}
                    // onRefersh={()=>{onRefersh()}}
                    // extraData={refersh}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=>{
                        return  <ItemViewUser 
                        selectDefault={checkSelectDefault(item)
                        } onSelect={onSelect} 
                        callback={onRefersh} 
                        data_render={item}>
                        </ItemViewUser>
                    }}
                    ></FlatList>
                </ScrollView>
            </View>
        </View>
    )
}

export default EmployeeCollectionScreen

const styles = StyleSheet.create({
    container:{
        // marginTop:5,
        flex:1,
        flexDirection:'column'
    },
    header:{
        // flexGrow:0.5,
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:0,
        margin:0,
        height:40
        // marginVertical:15
    },
    listEmployee:{
        flex:1
    },
    addButton:{
        alignSelf:'center',
        marginRight:25,
    }
})

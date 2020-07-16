import React,{useEffect,useReducer} from 'react'
import { StyleSheet, Text, View,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import BaseApi from '../../components/common/BaseApi'
import ItemView from '../../components/taskinfo/ItemView'
import reducer from '../../components/taskinfo/Reducer'
import {setTasksInfo,onRefresh,selectMultiple,deleteSelect} from '../../components/taskinfo/Actions'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

const TaskInfoCollectionScreen = ({navigation}) => {
    const [state,dispatch] = useReducer(reducer,{tasksInfo:[],refresh:0})    
    useEffect(()=>{
        BaseApi({collectionName:'task_info'}).get().then(
            (response)=>{                
                dispatch(setTasksInfo(response.data.objects))
            }
        )
    },[state.refresh])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={async()=>{
                        await dispatch(deleteSelect())
                        dispatch(onRefresh())}}
                    >
                    <Text><FontAwesome5 style={{color:'#9f0000'}} name="trash-alt" size={26}></FontAwesome5></Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={()=>{navigation.navigate('TaskInfoDetailScreen', { 'id': null,callback:()=>dispatch(onRefresh()) })}}
                    >
                    <Text><Ionicons style={{color:'blue'}} name="md-add-circle" size={30}></Ionicons></Text>
                </TouchableOpacity>
            </View>
            {/* <ScrollView> */}
            <View style={{flex:1}}>
                <FlatList
                data={state.tasksInfo}
                renderItem={({item})=>{
                    return <ItemView 
                    callback={()=>dispatch(onRefresh())} 
                    onSelect={(data)=>dispatch(selectMultiple(data))}
                    data_render={item}></ItemView>
                }}
                ></FlatList>
            </View>
            {/* </ScrollView> */}
        </View>
    )
}

export default TaskInfoCollectionScreen

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
        // flexGrow:20
        flex:1
    },
    addButton:{
        alignSelf:'center',
        // height:30,
        // lineHeight:30,
        // padding:3,
        marginRight:25,
    }
})

import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,FlatList,Dimensions } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation'
import TaskInfoSelectView from '../taskinfo/SelectView'
const WIDTH = Dimensions.get('window').width

const ListTaskView = ({data,setState}) => {
    const [visibleTaskInfoSelectView,setVisibleTaskInfoSelectView] = useState(false)
    const [data_render,setDataRender] = useState([])
    useEffect(()=>{
        setDataRender(data)
    })
    const selectTaskInfo = (task_select)=>{
        setDataRender([...task_select])
        setState({tasks_info:task_select})
    }
    return (
        <View style={styles.container}>
            <View style={styles.list_task}>
                <FlatList
                data={data_render}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item,index)=>index}
                ItemSeparatorComponent={()=><Text>, </Text>}
                renderItem={({item})=>{
                return <Text>{item.task_name}</Text>
                }}
                ></FlatList>
            </View>
            <View style={styles.show_more}>
                <Foundation onPress={()=>{setVisibleTaskInfoSelectView(!visibleTaskInfoSelectView)}} name='indent-more' size={26}></Foundation>
            </View>
            <TaskInfoSelectView
            visible={visibleTaskInfoSelectView} 
            setVisible={setVisibleTaskInfoSelectView}
            onSelect={selectTaskInfo}
            dataSetSelect={data_render}
            ></TaskInfoSelectView>
        </View>
    )
}

export default ListTaskView

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
    },
    list_task:{
        flex:1,
        // flexWrap:'wrap',
        // flexDirection:'row',
    },
    show_more:{
        width:20,
        alignSelf:'center'
    }
})

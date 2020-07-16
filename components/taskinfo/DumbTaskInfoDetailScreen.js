import React from 'react'
import { StyleSheet, Text, View,TextInput,FlatList,TouchableOpacity,TouchableWithoutFeedback,Keyboard } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import PropTypes from 'prop-types';
import moment from 'moment'

const DumbTaskInfoDetailScreen = ({
    data_render,
    onPressSaveTask,
    getAvatar,
    onPressDoneTask,
    onChangeTextTaskName,
    onPressAssignee,
    onPressButtonCloseAssignee,
    onPressDealine,
    onPressCloseDealine,
    onChangeTextDescription,
    onPressCloseDescription,
    onPressFollower,
    onPressCloseFollower}) => {
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles.container}>
            <View style={{flex:1}}>
            {/* task name */}
            <View style={data_render.id!=null?{...styles.task_info_name}:{display:'none'}}>
                <TextInput
                style={{fontWeight:'bold',fontSize:20,alignItems:'center',flex:1}}
                value={data_render.task_info_name}
                onChangeText={onChangeTextTaskName}
                ></TextInput>
                {/* <Text style={{fontWeight:'bold',fontSize:20,alignItems:'center'}}>{data_render.task_info_name}</Text> */}
            </View>
            {/* input task name  */}
            <View style={data_render.id==null?{...styles.input_task_name}:{display:'none'}}>
            <TextInput
            style={{fontSize:20,fontWeight:'bold',alignItems:'center'}}
            value={data_render.task_info_name}
            // autoFocus={true}
            placeholder={'Nhập tên việc'}
            onChangeText={onChangeTextTaskName}

            ></TextInput>
            </View>
            {/* assign name */}
            <View style={styles.attribute_field}>
                <Ionicons style={styles.iconLeft} name='ios-person' size={18}></Ionicons>
                <View style={styles.attribute_field_text}>
                    <TouchableOpacity style={{flex:1}} onPress={onPressAssignee}>
                    <Text style={styles.text}>{data_render.assignee != null?data_render.assignee.display_name:'chưa có ai nhận'}</Text>
                    </TouchableOpacity>
                    <AntDesign 
                    onPress={onPressButtonCloseAssignee} 
                    name={data_render.assignee != null?'close':'right'} 
                    style={styles.iconRight}
                    ></AntDesign>
                </View>
            </View>
            {/* dealine  */}
            {/* <View style={styles.attribute_field}>
                <AntDesign style={styles.iconLeft} name='clockcircleo' size={18}></AntDesign>
                <View style={styles.attribute_field_text}>
                    <TouchableOpacity
                        style={{flex:1}}
                        onPress={onPressDealine}>
                    <Text style={styles.text}>{data_render.end_time?moment.unix(data_render.end_time).format("DD/MM/YY: HH:mm"):''} 
                        {" "}Hạn chót
                    </Text>
                    </TouchableOpacity>
                    <AntDesign 
                    onPress={onPressCloseDealine} 
                    name={data_render.end_time != null ? 'close' : 'right'} 
                    style={styles.iconRight}>
                    </AntDesign>
                </View>
                <View>
                </View>
            </View> */}

            {/* description */}
            <View style={styles.attribute_field}>
                <SimpleLineIcons style={styles.iconLeft} name='note' size={18}></SimpleLineIcons>
                <View style={styles.attribute_field_text}>
                    <TextInput
                    style={{marginVertical:0,paddingVertical:0,flex:1,fontSize:18}}
                    placeholder='Mô tả'
                    multiline={true}
                    value={data_render.description?data_render.description:''}
                    onChangeText={onChangeTextDescription}
                    ></TextInput>
                    <AntDesign onPress={onPressCloseDescription} name={data_render.description!=null?'close':'right'} style={styles.iconRight}></AntDesign>
                </View>
            </View>
            {/* Follower */}
            <View style={{...styles.attribute_field,flexDirection:'column'}}>
                <View style={{flexDirection:'row'}}>
                    <SimpleLineIcons style={styles.iconLeft} name='user-follow' size={18}></SimpleLineIcons>
                    <View style={styles.attribute_field_text}>
                        <Text 
                        style={styles.text}
                        onPress={onPressFollower}
                        >Những người theo dõi</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text 
                            onPress={onPressFollower} 
                            style={{color:'gray',alignSelf:'center',fontSize:15,paddingRight:20}}
                            >{data_render.followers.length} people</Text>
                            <AntDesign 
                            onPress={onPressCloseFollower} 
                            name={data_render.followers.length!=0?'close':'right'} 
                            style={styles.iconRight}></AntDesign>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginLeft:25,margin:5}}>
                    <FlatList
                    horizontal
                    data={data_render.followers}
                    renderItem={({item})=>{
                    return <View style={styles.follower}>
                            {getAvatar(item)}
                        </View>
                    }}
                    ></FlatList>
                </View>
            </View>
            </View>
            <View style={{ margin: 0, padding: 10, flexDirection: 'row', backgroundColor: 'white',alignItems:'center' }}>
                <TouchableOpacity
                    onPress={onPressSaveTask}
                    style={{ backgroundColor: '#006CFF', borderRadius: 10, flex: 1, height: 40,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Lưu việc</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        </TouchableWithoutFeedback>
    )
}

export default DumbTaskInfoDetailScreen

DumbTaskInfoDetailScreen.propTypes = {
    data_render: PropTypes.object,
    onPressSaveTask: PropTypes.func,
    getAvatar: PropTypes.func,
    onPressDoneTask: PropTypes.func,
    onChangeTextTaskName: PropTypes.func,
    onPressAssignee: PropTypes.func,
    onPressButtonCloseAssignee: PropTypes.func,
    onPressDealine: PropTypes.func,
    onPressCloseDealine: PropTypes.func,
    onChangeTextDescription: PropTypes.func,
    onPressCloseDescription: PropTypes.func,
    onPressFollower: PropTypes.func,
    onPressCloseFollower: PropTypes.func
}

DumbTaskInfoDetailScreen.defaultProps = {
    data_render: {},
    onPressSaveTask: () => {},
    getAvatar: () => {},
    onPressDoneTask: () => {},
    onChangeTextTaskName: () => {},
    onPressAssignee: () => {},
    onPressButtonCloseAssignee: () => {},
    onPressDealine: () => {},
    onPressCloseDealine: () => {},
    onChangeTextDescription: () => {},
    onPressCloseDescription: () => {},
    onPressFollower: () => {},
    onPressCloseFollower: () => {}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:10,
        paddingHorizontal:10,
        backgroundColor:'white',
        position:'relative'
    },
    task_info_name:{
        flexDirection:'row'
    },
    iconLeft:{
        alignSelf:'center',
        paddingRight:10
    },
    attribute_field:{
        flexDirection:'row',
    },
    attribute_field_text:{
        flex:1,
        paddingVertical:15,
        borderBottomWidth:0.6,
        borderColor:'#CFCFCF',
        position:'relative',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    iconRight:{
        alignSelf:'center',
        color:'gray',
        paddingHorizontal:5,
        fontSize:16
    },
    follower:{
        backgroundColor:'#00C9FF',
        position:'relative',
        width:35,
        height:35,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:18,
        padding:2,
    },
    input_task_name:{
        height:25,
        padding:0,
        justifyContent:'center'
    },
})


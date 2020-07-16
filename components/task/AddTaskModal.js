/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import BaseApi from '../common/BaseApi';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentTask, refershListTaskHomeScreen} from 'store/task/Actions';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;
const AddTask = (props) => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.currentUser);
  const current_task = useSelector((state) => state.currentTask);
  const current_group_select = useSelector((state) => state.currentGroupSelect);
  const {visible, setVisible, onRefresh} = {...props};
  const dispatch = useDispatch();
  const removeAssignee = () => {
    dispatch(setCurrentTask({assignee: {}}));
  };

  const getUniqueID = () => {
    let UID = Date.now() + (Math.random() * 100000).toFixed();
    return 'UP' + UID.toUpperCase();
  };
  const onCreateTask = async () => {
    if (current_task.task_name != '') {
      const task_code = await getUniqueID();
      const data_post = {...current_task};
      data_post.task_code = task_code;
      data_post.group_id = current_group_select.id;
      await BaseApi({collectionName: 'save_task'}).post(data_post);
      dispatch(refershListTaskHomeScreen())
      setVisible(!visible);
      onRefresh();
    }
  };
  const onDissmiss = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    if (visible) {
      // StatusBar.setBackgroundColor('rgba(25,25,25,0.3)')
      dispatch(
        setCurrentTask({
          id: null,
          assignee: currentUser,
          followers: [currentUser],
          group_id: current_group_select.id,
          task_name: '',
          note: '',
          end_time: null,
        }),
      );
      // dispatch(setCurrentTask({id:null,followers:[currentUser],group_id:current_group_select.id,task_name:'',note:''}))
    } else {
      // StatusBar.setBackgroundColor(Colors.headerColor)
    }
  }, [currentUser, current_group_select.id, dispatch, visible]);
  const onPressSelectAssignee = () => {
    setVisible(!visible);
    navigation.navigate('TaskDetailScreen');
  };
  const onPressDealine = () => {
    setVisible(!visible);
    navigation.navigate('TaskDetailScreen');
  };
  const displayDealine = () => {
    let dealine = current_task.end_time
    if (dealine) {
      if(Platform.OS === 'ios'){
        dealine = moment.unix(current_task.end_time).utc().format('DD-MM-YY HH:mm a')
      }else{
        dealine = moment.unix(current_task.end_time).format('DD-MM-YY HH:mm a')
      }
    }else{
      dealine = ''
    }
    return dealine
  };
  return (
    <Modal
      isVisible={visible}
      backdropColor="rgba(25,25,25,0.3)"
      onBackdropPress={() => {
        onDissmiss();
      }}
      avoidKeyboard={true}
      style={{margin: 0}}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={onDissmiss} style={{flex: 1}} />
        <View style={styles.add_task}>
          <View style={styles.add_task_body}>
            <TextInput
              style={styles.input_task}
              autoFocus={true}
              placeholder={'Nhập tên việc'}
              onChangeText={(term) => {
                dispatch(setCurrentTask({task_name: term}));
              }}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{flex: 1, flexDirection: 'row', position: 'relative'}}>
                <TouchableOpacity
                  style={styles.assignee}
                  onPress={onPressSelectAssignee}>
                  <FontAwesome5
                    style={{padding: 5, width: 35}}
                    name="user-alt"
                    size={15}
                  />
                  <Text style={{flex: 1, padding: 5}} numberOfLines={1}>
                    {current_task.assignee
                      ? current_task.assignee.display_name
                      : null}
                  </Text>
                </TouchableOpacity>
                <Text onPress={removeAssignee} style={styles.close_assignee}>
                  <AntDesign name="close" size={20} color="white" />
                </Text>
              </View>
              <TouchableOpacity
                style={styles.set_dealine}
                onPress={onPressDealine}>
                <AntDesign name="clockcircle" size={15} style={{padding: 5}} />
                <Text>Hạn chót</Text>
              </TouchableOpacity>
            </View>

            <Text
              style={current_task.end_time == null ? {display: 'none'} : null}>
              hạn chót
            </Text>
            <TouchableOpacity
              style={current_task.end_time == null ? {display: 'none'} : null}
              onPress={onPressDealine}>
              <TextInput
                style={{
                  height: 24,
                  // borderBottomWidth:1,
                  // borderBottomColor:'gray',
                  fontSize: 18,
                  lineHeight: 24,
                }}
                // placeholder={placeholder}
                editable={false}
                value={displayDealine}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.add_task_footer}>
            <TouchableOpacity
              style={styles.more}
              onPress={() => {
                onDissmiss();
                navigation.navigate('TaskDetailScreen', {
                  id: null,
                  callback: onRefresh,
                });
              }}>
              <Feather
                name="more-horizontal"
                size={20}
                style={{
                  paddingHorizontal: 10,
                  color: 'gray',
                  alignSelf: 'center',
                }}
              />
              <Text style={{color: 'gray', fontSize: 16}}>Xem thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onCreateTask(current_task);
              }}
              style={{
                ...styles.create,
                backgroundColor:
                  current_task.task_name != '' ? '#1D8EFF' : '#8FC7FF',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Tạo mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin:0,
    // backgroundColor:'rgba(25,25,25,0.3)',
  },
  dissmiss_field: {
    flex: 1,
    // flexGrow:7
    // height:300
  },
  add_task: {
    backgroundColor: 'white',
    // flexGrow:3,
    // height:200,
    // flex:1,
    // flexBasis:220,
    // minHeight:220,
    // maxHeight:250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'column',
  },
  add_task_body: {
    padding: 15,
    // flex:1
  },
  input_task: {
    // marginHorizontal:15,
    // marginTop:25,
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  assignee: {
    flexDirection: 'row',
    // marginHorizontal:15,
    // width:WIDTH*3/5,
    overflow: 'hidden',
    backgroundColor: '#DDDDDD',
    // padding:7,
    borderRadius: 20,
    alignItems: 'center',
    padding: 6,
    flex: 1,
  },
  close_assignee: {
    // backgroundColor:'#8FC7FF',
    // width:25,
    // paddingHorizontal:10,
    borderRadius: 10,
    fontSize: 16,
    position: 'absolute',
    color: 'black',
    width: 20,
    right: 10,
    alignSelf: 'center',
  },
  set_dealine: {
    flexDirection: 'row',
    width: (WIDTH * 1.5) / 5,
    backgroundColor: '#DDDDDD',
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 10,
    // height:40,
    // position:'relative'
  },
  add_task_footer: {
    height: 50,
    borderTopWidth: 0.6,
    borderColor: '#E1E1E1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  more: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  create: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#8FC7FF',
    marginHorizontal: 10,
    borderRadius: 20,
  },
});

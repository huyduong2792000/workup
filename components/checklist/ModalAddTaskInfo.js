import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setTaskInfo} from 'store/taskinfo/Actions';
import {addTaskInfo} from 'store/checklist/Actions';
import Colors from 'constants/Colors';
import GroupSuggestView from './GroupSuggest';
const WIDTH = Dimensions.get('window').width;
const ModalAddTaskInfo = (props) => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.currentUser);
  const task_info = useSelector((state) => state.TaskInfo);
  const Checklist = useSelector((state) => state.Checklist);
  const currentGroupSelect = useSelector((state) => state.currentGroupSelect);
  const GroupSuggest = useSelector((state) => state.GroupSuggest);
  const {visible, setVisible} = {...props};
  // const [visibleDateTime,setVisibleDateTime]= useState(0)
  const [group, setGroup] = useState(GroupSuggest);
  const [groups_suggest, setGroupsSuggest] = useState([]);

  const dispatch = useDispatch();
  const removeAssignee = () => {
    dispatch(setTaskInfo({assignee: {}, assignee_id: null}));
  };
  const onCreateTask = () => {
    let task_info_save = {...task_info};
    let index_match = groups_suggest.findIndex((item, index) => {
      return (
        item.group_name === group.group_name ||
        item.unsigned_name == group.group_name
      );
    });
    // console.log(index_match);

    if (index_match !== -1) {
      task_info_save.group = groups_suggest[index_match];
      task_info_save.group_id = groups_suggest[index_match].id;
      dispatch(addTaskInfo(task_info_save));
      onDissmiss();
    } else {
      task_info_save.group = {
        group_name: group.group_name,
        parent_id: currentGroupSelect.id,
      };
      task_info_save.group_id = null;
      dispatch(addTaskInfo(task_info_save));
      onDissmiss();
    }
  };
  const onDissmiss = () => {
    // setVisibleDateTime(0)
    setVisible(!visible);
  };
  useMemo(() => {
    if (GroupSuggest.id !== currentGroupSelect.id) {
      setGroup(GroupSuggest);
    } else {
      setGroup({...group, id: null, group_name: null});
    }
    if (visible) {
      let init_task_info = {
        id: null,
        assignee_id: currentUser.id,
        assignee: currentUser,
        followers: [currentUser],
        task_info_name: '',
        checklist_id: Checklist.id,
        checklist: Checklist,
        group_id: group.id,
        group: group,
      };
      dispatch(setTaskInfo(init_task_info));
    } else {
    }
  }, [visible]);
  return (
    <Modal
      isVisible={visible}
      // transparent={true}
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
                dispatch(setTaskInfo({task_info_name: term}));
              }}
            />

            <Text style={{color: Colors.tintColor}}>Người nhận</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', position: 'relative'}}>
                <TouchableOpacity
                  style={styles.assignee}
                  onPress={() => {
                    setVisible(!visible);
                    navigation.navigate('TaskInfoDetailScreen');
                  }}>
                  <FontAwesome5
                    style={{padding: 5, width: 35}}
                    name="user-alt"
                    size={15}
                  />
                  <Text style={{flex: 1, padding: 5}} numberOfLines={1}>
                    {task_info.assignee
                      ? task_info.assignee.display_name
                      : null}
                  </Text>
                </TouchableOpacity>
                <Text onPress={removeAssignee} style={styles.close_assignee}>
                  <AntDesign name="close" size={20} color="white" />
                </Text>
              </View>
              {/* <TouchableOpacity style={styles.set_dealine} onPress={()=>{setVisibleDateTime(visibleDateTime+1)}}>

                                <AntDesign name='clockcircle' size={15} style={{padding:5}}></AntDesign>
                                <Text>Hạn chót</Text>
                            </TouchableOpacity> */}
            </View>

            <Text style={{color: Colors.tintColor}}>group</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={{flex: 1}}
                value={group.id ? group.group_name : null}
                placeholder={'Nhóm việc'}
                onChangeText={(term) => {
                  setGroup({...group, group_name: term});
                }}
              />
            </View>
            <GroupSuggestView
              data={group}
              setGroup={(data) => setGroup({...group, ...data})}
              data_suggest={groups_suggest}
              setDataSuggest={(data) => setGroupsSuggest(data)}
            />
          </View>
          <View style={styles.add_task_footer}>
            <TouchableOpacity
              style={styles.more}
              onPress={() => {
                onDissmiss();
                navigation.navigate('TaskInfoDetailScreen', {id: null});
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
                onCreateTask(task_info);
              }}
              style={{
                ...styles.create,
                backgroundColor:
                  task_info.task_info_name != '' ? '#1D8EFF' : '#8FC7FF',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddTaskInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin:0,
    // backgroundColor:'rgba(25,25,25,0.3)',
  },
  dissmiss_field: {
    flex: 1,
  },
  add_task: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'column',
  },
  add_task_body: {
    padding: 15,
    // flex:1
  },
  input_task: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  assignee: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#DDDDDD',
    borderRadius: 20,
    alignItems: 'center',
    padding: 6,
    flex: 1,
  },
  close_assignee: {
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
    backgroundColor: Colors.tintColor,
    marginHorizontal: 10,
    borderRadius: 20,
  },
});

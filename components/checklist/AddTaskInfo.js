import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalAddTaskInfo from './ModalAddTaskInfo';
import {useSelector, useDispatch} from 'react-redux';

const AddTaskInfo = () => {
  const [state, setState] = useState({toggle_add_task: false});
  const Checklist = useSelector(state => state.Checklist);
  const onShowModal = () => {
    if (Checklist.checklist_name && Checklist.checklist_name != '') {
      setState({toggle_add_task: !state.toggle_add_task});
    } else {
      DeviceEventEmitter.emit('showToast', {
        text: 'Tên checklist không được để trống',
        type: 'warning',
      });
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.add_task_container}
        onPress={() => onShowModal()}>
        <View style={styles.add_task}>
          <AntDesign name="plus" size={15} style={styles.add_task_icon} />
          <Text style={{fontSize: 18, color: 'gray' }}>Thêm việc</Text>
        </View>
      </TouchableOpacity>
      <ModalAddTaskInfo
        visible={state.toggle_add_task}
        setVisible={() => setState({toggle_add_task: !state.toggle_add_task})}
      />
    </View>
  );
};

export default AddTaskInfo;

const styles = StyleSheet.create({
  add_task_container: {
    backgroundColor: '#DDDDDD',
    padding: 5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  add_task: {
    // paddingVertical:10
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    flex: 1,
    // width:'100%'
  },
  add_task_icon: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    color: 'gray',
  },
});

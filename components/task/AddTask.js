import React, {useReducer} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import reducer from './Reducer';
import {createTask, setToggleAddTask} from './Action';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddTaskModal from './AddTaskModal';
const AddTask = ({onRefresh}) => {
  const [state, dispatch] = useReducer(reducer, {
    task: {},
    toggleAddTask: false,
  });

  return (
    <View>
      <TouchableOpacity
        style={styles.add_task_container}
        onPress={() => dispatch(setToggleAddTask())}>
        <View style={styles.add_task}>
          <AntDesign name="plus" size={15} style={styles.add_task_icon} />
          <Text style={{fontSize: 18, color: 'gray'}}>Thêm việc</Text>
        </View>
      </TouchableOpacity>
      <AddTaskModal
        visible={state.toggleAddTask}
        setVisible={() => dispatch(setToggleAddTask())}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default AddTask;

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

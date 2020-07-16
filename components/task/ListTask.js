import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import ItemView from './ItemView';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ListTask = ({data_render, setDone, onRefresh}) => {
  const [taskStatus, setTaskStatus] = useState({
    tasks_schedule: [],
    task_behind_schedule: [],
    tasks_no_schedule: [],
    tasks_done: [],
  });
  const [taskShowMode, setTaskShowMode] = useState({
    task_behind_schedule: true,
    tasks_schedule: true,
    tasks_no_schedule: true,
    tasks_done: true,
  });
  useEffect(() => {
    const task_behind_schedule = [];
    const tasks_schedule = [];
    const tasks_no_schedule = [];
    const tasks_done = [];
    const time_compare_task_behind = Math.floor(Date.now() / 1000);
    for (var task of data_render) {
      if (task.end_time != null && task.status === 0) {
        if (task.end_time >= time_compare_task_behind) {
          tasks_schedule.push(task);
        } else {
          task_behind_schedule.push(task);
        }
      } else if (task.end_time == null && task.status === 0) {
        tasks_no_schedule.push(task);
      } else if (task.status === 1) {
        tasks_done.push(task);
      }
    } //behind schedule
    setTaskStatus({
      ...taskStatus,
      task_behind_schedule: task_behind_schedule,
      tasks_schedule: tasks_schedule,
      tasks_no_schedule: tasks_no_schedule,
      tasks_done: tasks_done,
    });
  }, [data_render]);
  return (
    <View style={styles.container}>
      {/* <> */}
      <FlatList
        // showsVerticalScrollIndicator={false}
        data={[
          <Text
            onPress={() =>
              setTaskShowMode({
                ...taskShowMode,
                task_behind_schedule: !taskShowMode.task_behind_schedule,
              })
            }
            style={
              taskStatus.task_behind_schedule.length !== 0
                ? {...styles.title}
                : {display: 'none'}
            }>
            Đã trễ hạn
            <AntDesign name="caretright" size={10} />{' '}
          </Text>,
          <View
            style={
              taskShowMode.task_behind_schedule
                ? {...styles.tasks_style}
                : {display: 'none'}
            }>
            <FlatList
              data={taskStatus.task_behind_schedule}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => {
                return (
                  <ItemView
                    setDone={setDone}
                    data_render={item}
                    onRefresh={onRefresh}
                  />
                );
              }}
            />
          </View>,
          <Text
            onPress={() =>
              setTaskShowMode({
                ...taskShowMode,
                tasks_schedule: !taskShowMode.tasks_schedule,
              })
            }
            style={
              taskStatus.tasks_schedule.length !== 0
                ? {...styles.title}
                : {display: 'none'}
            }>
            Có lịch
            <AntDesign
              name={
                taskShowMode.tasks_schedule === true
                  ? 'caretright'
                  : 'caretdown'
              }
              size={10}
            />
          </Text>,
          <View
            style={
              taskShowMode.tasks_schedule
                ? {...styles.tasks_style}
                : {display: 'none'}
            }>
            <FlatList
              data={taskStatus.tasks_schedule}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => {
                return (
                  <ItemView
                    setDone={setDone}
                    data_render={item}
                    onRefresh={onRefresh}
                  />
                );
              }}
            />
          </View>,
          <Text
            onPress={() =>
              setTaskShowMode({
                ...taskShowMode,
                tasks_no_schedule: !taskShowMode.tasks_no_schedule,
              })
            }
            style={
              taskStatus.tasks_no_schedule.length !== 0
                ? {...styles.title}
                : {display: 'none'}
            }>
            Không có hạn chót
            <AntDesign
              name={
                taskShowMode.tasks_no_schedule === true
                  ? 'caretright'
                  : 'caretdown'
              }
              size={10}
            />
          </Text>,
          <View
            style={
              taskShowMode.tasks_no_schedule
                ? {...styles.tasks_style}
                : {display: 'none'}
            }>
            <FlatList
              data={taskStatus.tasks_no_schedule}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => {
                return (
                  <ItemView
                    setDone={setDone}
                    data_render={item}
                    onRefresh={onRefresh}
                  />
                );
              }}
            />
          </View>,
          <Text
            onPress={() =>
              setTaskShowMode({
                ...taskShowMode,
                tasks_done: !taskShowMode.tasks_done,
              })
            }
            style={
              taskStatus.tasks_done.length !== 0
                ? {...styles.title}
                : {display: 'none'}
            }>
            Đã xong
            <AntDesign
              name={
                taskShowMode.tasks_done === true ? 'caretright' : 'caretdown'
              }
              size={10}
            />
          </Text>,
          <View
            style={
              taskShowMode.tasks_done
                ? {...styles.tasks_style}
                : {display: 'none'}
            }>
            <FlatList
              data={taskStatus.tasks_done}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => {
                return (
                  <ItemView
                    setDone={setDone}
                    data_render={item}
                    onRefresh={onRefresh}
                  />
                );
              }}
            />
          </View>,
        ]}
        keyExtractor={(item, index) => JSON.stringify(index)}
        renderItem={({item}) => {
          return item;
        }}
      />
    </View>
  );
};

export default ListTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // flexDirection:'column'
    // height:'100%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 10,
  },
});

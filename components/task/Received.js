import React, {useReducer, useState, useMemo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ListTask from './ListTask';
import AddTask from './AddTask';
import BaseApi from '../common/BaseApi';
import reducer from './Reducer';
import {setTask, onRefresh, setDone} from './Action';
import {useSelector} from 'react-redux';
import PlaceholderLoading from './PlaceholderLoading';
import {useRoute} from '@react-navigation/native';

const Received = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, {tasks: [], refresh: 0});
  const current_group_select = useSelector((state) => state.currentGroupSelect);
  const route = useRoute();
  const [isFetching, setIsFetching] = useState(true);
  const getTasks = async () => {
    var filters = {};
    setIsFetching(true);
    if (current_group_select.id) {
      filters = {group_id: current_group_select.id};
      await BaseApi({collectionName: 'get_task_received_in_group'})
        .get({filters})
        .then((response) => {
          dispatch(setTask(response.data.objects));
        });
    } else {
      await BaseApi({collectionName: 'get_task_received_by_me'})
        .get()
        .then((response) => {
          dispatch(setTask(response.data.objects));
        });
    }
    setIsFetching(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTasks();
    });
    return unsubscribe;
  }, [navigation,current_group_select.id]);
  useMemo(() => {
    getTasks();
  }, [current_group_select.id]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isFetching ? (
        <PlaceholderLoading />
      ) : (
        <>
          <ListTask
            setDone={(data) => dispatch(setDone(data))}
            data_render={state.tasks}
            onRefresh={() => dispatch(onRefresh())}
          />
          <AddTask onRefresh={getTasks} />
        </>
      )}
    </View>
  );
};

export default Received;

const styles = StyleSheet.create({});

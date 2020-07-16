import React, {useEffect} from 'react';
import {Text, View, DeviceEventEmitter} from 'react-native';
import BaseApi from 'components/common/BaseApi';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentTask} from 'store/task/Actions';
import moment from 'moment';
import DumbTaskDetailScreen from 'screens/task/DumbTaskDetailScreen';

const TaskDetailScreen = ({navigation, route}) => {
  const id = route.params ? route.params.id : null;
  const currentUser = useSelector((state) => state.currentUser);
  const current_task = useSelector((state) => state.currentTask);
  const dispatch = useDispatch();
  navigation.setOptions({
    headerRight: () => (
      <View style={{paddingHorizontal: 10, position: 'relative'}}>
        <Text
          onPress={() => {
            onDeleteTask();
          }}
          style={{fontSize: 15, color: 'red'}}>
          Xóa
        </Text>
      </View>
    ),
  });
  const onPressSaveTask = async () => {
    var data_save = {...current_task};
    if (!data_save.task_code) {
      data_save.task_code = getUniqueID();
    }
    if (data_save.task_name != '' && data_save.task_name != undefined) {
      try {
        await BaseApi({collectionName: 'save_task'}).save(data_save);
        navigation.navigate('Home');
      } catch (err) {
        DeviceEventEmitter.emit('showToast', {
          text: 'Đã có lỗi xảy ra',
          type: 'danger',
        });
      }
    } else {
      navigation.navigate('Home');
    }
  };
  const onDeleteTask = () => {
    const data_save = {...current_task};
    data_save.deleted = true;
    if (data_save.assignee_id == null) {
      delete data_save.assignee;
      delete data_save.assignee_id;
    }
    delete data_save.note;
    if (data_save.id != null) {
      BaseApi({collectionName: 'save_task'})
        .save(data_save)
        .then((data) => {
          navigation.navigate('Home');
        })
        .catch(() => {
          console.log('error');
        });
    } else {
      navigation.navigate('Home');
    }
  };
  const getAvatar = (data) => {
    var name_test = data.display_name || data.email;
    name_test = name_test.split(' ');
    var name_display =
      name_test[0].slice(0, 1) + name_test[name_test.length - 1].slice(0, 1);
    return (
      <Text style={{color: 'white', position: 'absolute'}}>{name_display}</Text>
    );
  };
  const onPressDoneTask = () => {
    if (current_task.status == 1) {
      onSetCurrentTask({status: 0});
      // dispatch(setCurrentTask({status:0}))
    } else {
      onSetCurrentTask({status: 1});
      // dispatch(setCurrentTask({status:1}))
    }
  };
  const getUniqueID = () => {
    let UID = Date.now() + (Math.random() * 100000).toFixed();
    return 'UP' + UID.toUpperCase();
  };
  useEffect(() => {
    // console.log('useeffect');

    if (id) {
      BaseApi({collectionName: 'task'})
        .get({id: id})
        .then((response) => {
          onSetCurrentTask(response.data);
          // dispatch(setCurrentTask(data))
        });
    } else {
      const init_reducer = {
        assignee: currentUser,
        followers: [currentUser],
        status: 0,
        note: '',
        task_code: null,
      };
      onSetCurrentTask(init_reducer);
      // dispatch(setCurrentTask(init_reducer))
    }
  }, []);
  const onChangeTextTaskName = (term) => {
    onSetCurrentTask({task_name: term});
    // dispatch(setCurrentTask({task_name:term}))
  };
  const onPressAssignee = () => {
    navigation.navigate('SelectAssignee');
  };
  const onPressButtonCloseAssignee = () => {
    if (current_task.assignee != null) {
      onSetCurrentTask({assignee: null, assignee_id: null});
      // dispatch(setCurrentTask({assignee:null,assignee_id:null}))
    } else {
      navigation.navigate('SelectAssignee');
    }
  };
  const onPressDealine = () => {
    DeviceEventEmitter.emit('showDateTimePicker', {
      showTime: true,
      onChange: (date) => {
        onSetCurrentTask({end_time: moment(date).format('X')});
        // dispatch(setCurrentTask({end_time:moment(date).format("X")}))
      },
    });
  };
  const onPressCloseDealine = () => {
    if (current_task.end_time != null) {
      onSetCurrentTask({end_time: null});
      // dispatch(setCurrentTask({ end_time: null }))
    } else {
      onPressDealine();
    }
  };
  const onChangeTextDescription = (term) => {
    onSetCurrentTask({description: term});
    // dispatch(setCurrentTask({description:term}))
  };
  const onPressCloseDescription = () => {
    onSetCurrentTask({description: null});
    // dispatch(setCurrentTask({description:null}))
  };
  const onPressFollower = () => {
    navigation.navigate('SelectFollowers');
  };
  const onPressCloseFollower = () => {
    if (current_task.followers.length != 0) {
      onSetCurrentTask({followers: []});
      // dispatch(setCurrentTask({followers:[]}))
    } else {
      navigation.navigate('SelectFollowers');
    }
  };
  const onSetCurrentTask = (data) => {
    dispatch(setCurrentTask(data));
  };
  const displayDealine = () => {
    let dealine = current_task.end_time;
    if (dealine) {
      if (Platform.OS === 'ios') {
        dealine = moment
          .unix(current_task.end_time)
          .utc()
          .format('DD-MM-YY HH:mm ');
      } else {
        dealine = moment.unix(current_task.end_time).format('DD-MM-YY HH:mm ');
      }
    } else {
      dealine = '';
    }
    return dealine;
  };
  return (
    <DumbTaskDetailScreen
      data_render={current_task}
      onPressSaveTask={onPressSaveTask}
      getAvatar={getAvatar}
      onPressDoneTask={onPressDoneTask}
      onChangeTextTaskName={onChangeTextTaskName}
      onPressAssignee={onPressAssignee}
      onPressButtonCloseAssignee={onPressButtonCloseAssignee}
      onPressDealine={onPressDealine}
      onPressCloseDealine={onPressCloseDealine}
      onChangeTextDescription={onChangeTextDescription}
      onPressCloseDescription={onPressCloseDescription}
      onPressFollower={onPressFollower}
      onPressCloseFollower={onPressCloseFollower}
      displayDealine={displayDealine}
    />
  );
};

export default TaskDetailScreen;

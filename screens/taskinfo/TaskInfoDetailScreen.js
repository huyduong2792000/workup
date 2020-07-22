import React, {useEffect} from 'react';
import {Text, View, DeviceEventEmitter} from 'react-native';
import BaseApi from 'components/common/BaseApi';
import {useSelector, useDispatch} from 'react-redux';
import {setTaskInfo} from 'store/taskinfo/Actions';
import moment from 'moment';
import DumbTaskInfoDetailScreen from './DumbTaskInfoDetailScreen';

const TaskInfoDetailScreen = ({navigation, route}) => {
  const id = route.params ? route.params.id : null;
  const currentUser = useSelector((state) => state.currentUser);
  const task_info = useSelector((state) => state.TaskInfo);
  const dispatch = useDispatch();
  navigation.setOptions({
    headerRight: () => (
      <View style={{paddingHorizontal: 10, position: 'relative'}}>
        <Text onPress={onDeleteTask} style={{fontSize: 15, color: 'red'}}>
          Xóa
        </Text>
      </View>
    ),
  });
  const onPressSaveTask = async () => {
    var data_save = {...task_info};
    // console.log(data_save);

    if (data_save.task_info_name != '' && data_save.task_info_name) {
      try {
        await BaseApi({collectionName: `task_info`}).save(data_save);
        navigation.goBack();
      } catch {
        DeviceEventEmitter.emit('showToast', {
          text: 'Đã có lỗi xảy ra',
          type: 'danger',
        });
      }
    } else {
      navigation.goBack();
    }
  };
  const onDeleteTask = async () => {
    const data_save = {...task_info};
    data_save.deleted = true;
    // console.log(data_save);

    if (data_save.id != null) {
      try {
        await BaseApi({collectionName: 'task_info'}).save(data_save);
        navigation.goBack();
      } catch {
        DeviceEventEmitter.emit('showToast', {
          text: 'Đã có lỗi xảy ra',
          type: 'danger',
        });
      }
    } else {
      navigation.goBack();
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
  useEffect(() => {
    if (id != null) {
      BaseApi({collectionName: 'task_info'})
        .get({id: id})
        .then((response) => {
          // console.log(data);
          onSetCurrentTask(response.data);
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
    }
  }, []);
  const onChangeTextTaskName = (term) => {
    onSetCurrentTask({task_info_name: term});
  };
  const onPressAssignee = () => {
    navigation.navigate('ContainerSelectAssigneeTaskinfoScreen');
  };
  const onPressButtonCloseAssignee = () => {
    if (task_info.assignee != null) {
      onSetCurrentTask({assignee: null, assignee_id: null});
    } else {
      navigation.navigate('ContainerSelectAssigneeTaskinfoScreen');
    }
  };
  const onChangeTextDescription = (term) => {
    onSetCurrentTask({description: term});
  };
  const onPressCloseDescription = () => {
    onSetCurrentTask({description: null});
  };
  const onPressFollower = () => {
    navigation.navigate('ContainerSelectFollowersTaskInfoScreen');
  };
  const onPressCloseFollower = () => {
    if (task_info.followers.length != 0) {
      onSetCurrentTask({followers: []});
    } else {
      navigation.navigate('ContainerSelectFollowersTaskInfoScreen');
    }
  };
  const onSetCurrentTask = (data) => {
    dispatch(setTaskInfo(data));
  };
  return (
    <DumbTaskInfoDetailScreen
      data_render={task_info}
      onPressSaveTask={onPressSaveTask}
      getAvatar={getAvatar}
      onChangeTextTaskName={onChangeTextTaskName}
      onPressAssignee={onPressAssignee}
      onPressButtonCloseAssignee={onPressButtonCloseAssignee}
      onChangeTextDescription={onChangeTextDescription}
      onPressCloseDescription={onPressCloseDescription}
      onPressFollower={onPressFollower}
      onPressCloseFollower={onPressCloseFollower}></DumbTaskInfoDetailScreen>
  );
};

export default TaskInfoDetailScreen;


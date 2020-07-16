import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BaseApi from '../common/BaseApi';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ItemView = ({data_render, setDone, onRefresh}) => {
  const navigation = useNavigation();
  const setDoneTask = async () => {
    const data_put = {...data_render};
    data_put.status = 1;
    BaseApi({collectionName: 'task'})
      .put(data_put)
      .then(() => {
        setDone(data_render);
      });
  };
  const getScheduleStyle = () => {
    const now = Math.floor(Date.now() / 1000);
    if (data_render.status == 0 && data_render.end_time != null) {
      if (data_render.end_time - now >= 86400 * 7) {
        return {fontSize: 13, color: '#46E6FF'};
      } else {
        return {fontSize: 13, color: 'rgb(255, 115, 115)'};
      }
    } else if (data_render.status == 1 && data_render.end_time != null) {
      return {
        fontSize: 13,
        textDecorationLine: 'line-through',
        color: 'rgb(255, 115, 115)',
      };
    } else {
      return {display: 'none'};
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialIcons
          onPress={() => {
            setDoneTask();
          }}
          name={
            data_render.status == 0 ? 'check-box-outline-blank' : 'check-box'
          }
          size={24}
          style={
            data_render.status == 0
              ? {color: '#DDDDDD'}
              : {color: 'rgb(145, 255, 59)'}
          }
        />
      </View>
      <TouchableOpacity
        style={styles.task_name}
        onPress={() =>
          navigation.navigate('TaskDetailScreen', {
            id: data_render.id,
            callback: onRefresh,
          })
        }>
        <Text
          style={
            data_render.status == 0
              ? {fontSize: 17}
              : {
                  fontSize: 17,
                  textDecorationLine: 'line-through',
                  color: 'rgb(171, 171, 171)',
                }
          }>
          {data_render.task_name}
        </Text>
        <Text style={getScheduleStyle()}>
          {moment.unix(data_render.end_time).format('DD/MM/YY: HH:mm a')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // paddingVertical:6,
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
    padding: 10,
    // paddingVertical:6
  },
  task_name: {
    paddingVertical: 15,
    borderBottomWidth: Platform.OS === 'ios' ? 0.3 : 0.4,
    borderColor: '#F1F1F1',
    flex: 1,
  },
});
